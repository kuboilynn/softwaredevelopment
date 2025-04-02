import React, { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import '../pages/styles/LecIssueCard.css';

const LecIssueCard = () => {
  const { studentIssues, setStudentIssues } = useOutletContext(); // Access and update context
  const [issueList, setIssueList] = useState(studentIssues || []);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState('submittedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    setIssueList(studentIssues || []);
  }, [studentIssues]);

  const handleResolve = async (issueId) => {
    try {
      const updatedIssues = issueList.map((issue) =>
        issueId === issue.id ? { ...issue, status: 'Resolved' } : issue
      );
      setIssueList(updatedIssues);
      setStudentIssues(updatedIssues); // Update context

      const response = await fetch(`http://localhost:3001/api/issues/${issueId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Resolved' }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to update issue status');
      console.log(`Issue with ID: ${issueId} has been resolved`);
    } catch (error) {
      console.error('Error resolving issue:', error);
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
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
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
                <td>{issue.student || 'Unknown Student'}</td>
                <td>
                  <span className={`status-badge ${issue.status?.toLowerCase()}`}>
                    {issue.status || 'Pending'}
                  </span>
                </td>
                <td>{issue.description || 'No description'}</td>
                <td>{issue.submittedAt || 'Not set'}</td>
                <td>
                  {issue.status !== 'Resolved' ? (
                    <button className="resolve-button" onClick={() => handleResolve(issue.id)}>
                      Resolve
                    </button>
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