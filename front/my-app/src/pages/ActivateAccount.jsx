import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApiRequest from '../utils/useApiRequest';
import { domain } from '../utils/domain';
import './styles/ActivateAccount.css';

const ActivateAccount = () => {
    const { getRequest, loading, error } = useApiRequest();
    const { uid, token } = useParams(); // Fixed: useSearchParams returns an array
    const navigate = useNavigate();
    const [activationMessage, setActivationMessage] = useState(null);

    const endpoint = `${domain}/accounts/activate/${uid}/${token}`;

    // Handle the account activation logic
    const activateAccount = async () => {
        try {
            const req = await getRequest(endpoint);

            if (req.status === 200) {
                setActivationMessage(req.body.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                const errorMsg = req.details?.error || "Something went wrong.";
                setActivationMessage(errorMsg);
                console.log(errorMsg);
            }
        } catch (err) {
            const errorMsg = "Failed to activate account. Please try again.";
            setActivationMessage(errorMsg);
            console.log(errorMsg);
        }
    };

    useEffect(() => {
        let hasActivated = false;
        if (uid && token && !hasActivated) {
            hasActivated = true;
            activateAccount();
        }
    }, [uid, token]);

    // Loading state while waiting for the params to be available
    if (!uid || !token) {
        return (
            <div className="loading-container">
                <div className="loading-text">Loading...</div>
            </div>
        );
    }

    return (
        <div className="activation-container">
            <div className="activation-card">
                <div className="logo-container">
                    <img src="/makererelogo.png" className="logo" alt="logo" />
                </div>
                <h1 className="activation-title">Account Activation</h1>

                {/* Loading State */}
                {loading && (
                    <div className="loading-message">Activating your account...</div>
                )}

                {/* Success/Error Message */}
                {activationMessage && (
                    <div className={`message ${activationMessage.includes("Failed") ? "error" : "success"}`}>
                        {activationMessage}
                    </div>
                )}

                {/* Information display */}
                {!loading && !activationMessage && (
                    <div className="info-container">
                        <div className="spinner-container">
                            {/* Replace with your actual spinner component */}
                            <div className="spinner"></div>
                        </div>
                        <p className="info-text">Please wait while we activate your account.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivateAccount;