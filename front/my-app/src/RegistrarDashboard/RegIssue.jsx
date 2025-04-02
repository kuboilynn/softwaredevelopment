import React, { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import "../pages/styles/Dashboard.css";

function RegIssue() {
  const { lecturerIssues, setLecturerIssues } = useOutletContext(); // Access and update context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLecturerIssues = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lecturer-issues');
        if (!response.ok) throw new Error('Failed to fetch lecturer issues');
        const data = await response.json();
        setLecturerIssues(data); // Update context with fetched issues
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lecturer issues:', error);
        setLecturerIssues([]);
        setLoading(false);
      }
    };
    fetchLecturerIssues();
  }, [setLecturerIssues]);

  if (loading) {
    return <div className="issues-container">Loading issues...</div>;
  }

  return (
    <div className="issues-container">
      <h2>Reported Issues</h2>
      <div className="card-grid">
        {lecturerIssues.length > 0 ? (
          lecturerIssues.map((issue) => (
            <div className="card" key={issue.id}>
              <h3>Issue #{issue.id}</h3>
              <p>{issue.description || 'Details from lecturer dashboard...'}</p>
              <span className={`status ${issue.status.toLowerCase()}`}>
                {issue.status || 'Pending'}
              </span>
            </div>
          ))
        ) : (
          <p>No issues reported yet.</p>
        )}
      </div>
    </div>
  );
}

export default RegIssue;