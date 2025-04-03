import React, { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import "../pages/styles/Dashboard.css";
import useApiRequest from "../utils/useApiRequest";
import { domain } from "../utils/domain";

function RegIssue() {
<<<<<<< HEAD
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
=======
  const { putRequest, loading: loadingPut } = useApiRequest()
  const { lecturerIssues, setLecturerIssues, loading } = useOutletContext(); // Access and update context

  const [issueList, setIssueList] = useState(lecturerIssues || []);

  useEffect(() => {
    setIssueList(lecturerIssues || []);
  }, [lecturerIssues]);
>>>>>>> Lynn

  if (loading) {
    return <div className="issues-container">Loading issues...</div>;
  }

<<<<<<< HEAD
=======
  const handleResolve = async (issueId, action) => {
    try {
      const updatedIssues = issueList.map((issue) =>
        issueId === issue.id ? { ...issue, status: action } : issue
      );
      //setIssueList(updatedIssues);
      setLecturerIssues(updatedIssues);

      const req = await putRequest(`${domain}/submissions/${issueId}`, { status: action });
      console.log(req);

      if (req.status === 200) {
        console.log(`Issue with ID: ${issueId} has been ${action}.`);
      } else if (req.status === 400) {
        console.log(req.details?.error || 'Bad request');
      } else if (req.status === 500) {
        console.log("Internal server error. Please try again later.");
      } else {
        console.log("An unexpected error occurred.");
      }
    } catch (error) {
      console.error(`Error trying to ${action} issue:`, error);
      //setIssueList(studentIssues); // Revert on failure
    }
  };

>>>>>>> Lynn
  return (
    <div className="issues-container">
      <h2>Reported Issues</h2>
      <div className="card-grid">
        {lecturerIssues.length > 0 ? (
          lecturerIssues.map((issue) => (
            <div className="card" key={issue.id}>
<<<<<<< HEAD
              <h3>Issue #{issue.id}</h3>
              <p>{issue.description || 'Details from lecturer dashboard...'}</p>
              <span className={`status ${issue.status.toLowerCase()}`}>
                {issue.status || 'Pending'}
              </span>
=======
              <h3 style={{display:"flex", justifyContent:"space-between"}}><span>Issue #{issue.id}</span> <span className={`status ${issue.status.toLowerCase()}`}>
                {issue.status || 'Pending'}
              </span></h3>
              <p>{issue.description || 'Details from lecturer dashboard...'}</p>
              <div style={{ display: "flex", marginTop:"20px" }}>
                <button className="resolve-button" onClick={() => handleResolve(issue.id, "pending")}>
                  Pending
                </button>
                <button className="resolve-button" style={{ background: "orange" }}  onClick={() => handleResolve(issue.id, "resolved")}>
                  Resolve
                </button>
                <button className="resolve-button" style={{ background: "red" }} onClick={() => handleResolve(issue.id, "rejected")}>
                  Reject
                </button>
              </div>
>>>>>>> Lynn
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