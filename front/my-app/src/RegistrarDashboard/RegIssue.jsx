import React, { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import "../pages/styles/Dashboard.css";
import useApiRequest from "../utils/useApiRequest";
import { domain } from "../utils/domain";

function RegIssue() {
  const { putRequest, loading: loadingPut } = useApiRequest()
  const { lecturerIssues, setLecturerIssues, loading } = useOutletContext(); // Access and update context

  const [issueList, setIssueList] = useState(lecturerIssues || []);

  useEffect(() => {
    setIssueList(lecturerIssues || []);
  }, [lecturerIssues]);

  if (loading) {
    return <div className="issues-container">Loading issues...</div>;
  }

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

  return (
    <div className="issues-container">
      <h2>Reported Issues</h2>
      <div className="card-grid">
        {lecturerIssues.length > 0 ? (
          lecturerIssues.map((issue) => (
            <div className="card" key={issue.id}>
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
