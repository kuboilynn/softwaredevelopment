import  { useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "./EncryptDecrypt";
import { domain } from "./domain";

// Shared refresh token control
let isRefreshing = false;
let refreshPromise = null;

const useApiRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Function to refresh access token (with lock)
    const fetchRefreshToken = async () => {
        if (isRefreshing) {
            return refreshPromise;
        }

        isRefreshing = true;
        refreshPromise = (async () => {
            const token = await getFromLocalStorage("authInfo");

            if (!token) throw new Error("No refresh token available");

            const response = await fetch(`${domain}/accounts/token/refresh`, {
                method: "POST",
                body: JSON.stringify({ refresh: token.refreshToken }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to refresh token");

            const data = await response.json();

            saveToLocalStorage("authInfo", {
                ...token,
                accessToken: data.access,
                refreshToken: data.refresh,
            });

            return data.access;
        })()
            .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
            });

        return refreshPromise;
    };

    //General API Request Handler
    const sendRequest = async (url, method, data = null, isMultipart = false) => {
        setLoading(true);
        setError(null);

        try {
            let headers = {};
            let body = null;
            let token = await getFromLocalStorage("authInfo");

            if (token) {
                headers.Authorization = `Token ${token.accessToken}`;
            }

            if (data !== null) {
                if (isMultipart) {
                    body = data;
                } else {
                    headers["Content-Type"] = "application/json";
                    body = JSON.stringify(data);
                }
            }

            let requestOptions = { method, headers, body };
            let apiResponse = await fetch(url, requestOptions);
            let responseData = null;

            // Handle no-content status codes early
            if (apiResponse.status === 204) return { message: "Delete was successful", status: 204 };
            if (apiResponse.status === 205) return { message: "Logout successful", status: 205 };

            //Refresh token on 401
            if (apiResponse.status === 401) {
                try {
                    console.log("🔄 Refreshing access token...");
                    const newAccessToken = await fetchRefreshToken();

                    // Retry the request with the new access token
                    headers.Authorization = `Token ${newAccessToken}`;
                    requestOptions.headers = headers;
                    apiResponse = await fetch(url, requestOptions);
                } catch (refreshError) {
                    console.error("Token refresh failed, logging out user...");
                    localStorage.removeItem("authInfo")
                    localStorage.removeItem("isLoggedIn")
                    return {
                        success: false,
                        message: "Unauthorized. Please log in again.",
                        status: 401,
                    };
                }
            }

            // Try to parse the response (if applicable)
            const contentType = apiResponse.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                responseData = await apiResponse.json();
            }

            if (!apiResponse.ok) {
                throw{
                    message: responseData?.error || `Request failed with status ${apiResponse.status}`,
                    status: apiResponse.status,
                    details: responseData,
                };
            }

            return { status: apiResponse.status, body: responseData };
        } catch (err) {
            console.error("API Request Error:", err);

            const errorObj = {
                message: err?.message || "Something went wrong",
                status: err?.status || null,
                details: err?.details || null,
            };

            setError(errorObj);
            return { success: false, ...errorObj };
        } finally {
            setLoading(false);
        }
    };

    //API Methods
    const postRequest = async (url, data, isMultipart = false) => await sendRequest(url, "POST", data, isMultipart);
    const putRequest = async (url, data, isMultipart = false) => await sendRequest(url, "PUT", data, isMultipart);
    const deleteRequest = async (url) => await sendRequest(url, "DELETE");
    const getRequest = async (url) => await sendRequest(url, "GET");

    return { postRequest, putRequest, deleteRequest, getRequest, loading, error };
};

export default useApiRequest;