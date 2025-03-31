import React, { useState } from "react";
import '../pages/styles/IssueCard.css';

const IssueCard = ({ issues }) => {
    
    const [issueList, setIssueList] = useState(issues || []);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortField, setSortField] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');

  
    const handleResolve = (issueId) => {
        setIssueList((prevIssues) =>
            prevIssues.map((issue) =>
                issueId === issue.id
                    ? { ...issue, status: 'Resolved', Issue_status: 'Resolved' }
                    : issue
            )
        );
        console.log(`Issue with ID: ${issueId} has been resolved`);
    };

   
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
                        <th onClick={() => handleSort('title')}>
                            Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
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
                        <th onClick={() => handleSort('category')}>
                            Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('priority')}>
                            Priority {sortField === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
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
                                <td title={issue.title}>{issue.title || 'Untitled'}</td>
                                <td>
                                    <strong>Student:</strong> {issue.student || 'Student Name'}
                                </td>
                                <td>
                                    <strong>Status:</strong>
                                    <span className={`status-badge ${issue.status?.toLowerCase()}`}>
                                        {issue.status || 'Not set'}
                                    </span>
                                </td>
                                <td>{issue.description || 'No description provided'}</td>
                                <td>{issue.submittedAt || 'Not set'}</td>
                                <td>{issue.category || 'Not set'}</td>
                                <td>
                                    <span className={`priority-badge ${issue.priority?.toLowerCase()}`}>
                                        {issue.priority || 'Not set'}
                                    </span>
                                </td>
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
                            <td colSpan={8} className="no-issues">
                                No issues Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default IssueCard;
