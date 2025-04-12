import React, { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import '../pages/styles/LecIssueCard.css';
import useApiRequest from "../utils/useApiRequest";
import { domain } from "../utils/domain";

const LecIssueCard = () => {

  const { putRequest, loading } = useApiRequest()

  const { studentIssues, setStudentIssues } = useOutletContext(); // Access and update context
  const [issueList, setIssueList] = useState(studentIssues || []);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState('submittedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    setIssueList(studentIssues || []);
  }, [studentIssues]);


  const handleResolve = async (issueId, action) => {
    try {
      const updatedIssues = issueList.map((issue) =>
        issueId === issue.id ? { ...issue, status: action } : issue
      );
      setIssueList(updatedIssues);
      setStudentIssues(updatedIssues);

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
      setIssueList(studentIssues); // Revert on failure
    }
  };



  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
    setIssueList((prevIssues) =>
      [...prevIssues].sort((a, b) => {
        const valueA = a[field]?.toString().toLowerCase() || '';
        const valueB = b[field]?.toString().toLowerCase() || '';
        return newSortOrder === 'asc' ? valueA > valueB ? 1 : -1 : valueA < valueB ? 1 : -1;
      })
    );
  };

  const filteredIssues = issueList.filter((issue) => {
    if (filterStatus === 'All') return true;
    return issue.status === filterStatus;
  });

  return (
    <div className="issue-card-container">
      <div className="filter-section">
        <label>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All</option>

          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>

        </select>
      </div>

      <table className="Issue-card-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('student')}>
              Student {sortField === 'student' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('status')}>
              Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('description')}>
              Description {sortField === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('submittedAt')}>
              Submitted At {sortField === 'submittedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <tr
                key={issue.id}
                className={`issue-card-row ${issue.status === 'Resolved' ? 'resolved' : ''}`}
              >

                <td>{`${issue.student.first_name} ${issue.student.last_name}` || 'Unknown Student'}</td>

                <td>
                  <span className={`status-badge ${issue.status?.toLowerCase()}`}>
                    {issue.status || 'Pending'}
                  </span>
                </td>
                <td>{issue.description || 'No description'}</td>

                <td>{new Date(issue.submission_date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  //timeZoneName: "short"
                }) || 'Not set'}</td>
                <td>
                  {(issue.status !== 'resolved' && issue.status !== 'rejected') ? (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <button className="resolve-button" onClick={() => handleResolve(issue.id, "resolved")}>
                        Resolve
                      </button>
                      <button className="resolve-button" style={{ background: "red" }} onClick={() => handleResolve(issue.id, "rejected")}>
                        Reject
                      </button>
                    </div>

                  ) : (
                    <span className="resolve-text">Resolved</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-issues">
                No issues found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LecIssueCard;