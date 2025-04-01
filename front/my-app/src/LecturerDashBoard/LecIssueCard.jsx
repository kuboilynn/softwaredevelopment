import React, { useState } from "react";
import '../pages/styles/LecIssueCard.css';

const LecIssueCard = ({ issues }) => {
    const [issueList, setIssueList] = useState(issues || []);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortField, setSortField] = useState('submittedAt'); // Default sort by submission date
    const [sortOrder, setSortOrder] = useState('desc'); // Default descending (newest first)

    // Handle resolving an issue
    const handleResolve = (issueId) => {
        setIssueList((prevIssues) =>
            prevIssues.map((issue) =>
                issueId === issue.id
                    ? { ...issue, status: 'Resolved' }
                    : issue
            )
        );
        console.log(`Issue with ID: ${issueId} has been resolved`);
        // TODO: Add API call to update status in backend
        // fetch(`/api/issues/${issueId}`, {
        //   method: 'PATCH',
        //   body: JSON.stringify({ status: 'Resolved' }),
        //   headers: { 'Content-Type': 'application/json' }
        // });
    };

    // Handle sorting
    const handleSort = (field) => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);

        setIssueList((prevIssues) =>
            [...prevIssues].sort((a, b) => {
                const valueA = a[field]?.toString().toLowerCase() || '';
                const valueB = b[field]?.toString().toLowerCase() || '';
                return newSortOrder === 'asc'
                    ? valueA > valueB ? 1 : -1
                    : valueA < valueB ? 1 : -1;
            })
        );
    };

    // Filter issues by status
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