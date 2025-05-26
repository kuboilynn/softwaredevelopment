import React, { useEffect, useState } from "react";

const API = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your Django backend API endpoint
    const apiUrl = "https://mukisamark.pythonanywhere.com/";

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Django Backend</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
  
};


export default API;