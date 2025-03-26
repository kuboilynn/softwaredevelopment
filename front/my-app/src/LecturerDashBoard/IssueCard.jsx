import React from "react";
import '../pages/styles/IssueCard.css';

const IssueCard = ({issue}) =>{
    return(
        <div className="issue-card-container">
            <table className="Issue-card-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Student</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Actions</th>
                </tr>
                </thead>

                <tbody> 
                <tr className="issue-card-row">
                    <td>{issue?.title||'Issue Title'}</td>
                    <td><strong>Student:</strong>{issue?.students||'Student Name'}</td>
                    <td><strong>Status:</strong>{issue?.status||'Issue status'}</td>
                    <td>{issue?.description||'Issue Description goes here....'}</td>
                    <td>
                        <button className="resolve-button" onClick={() => handleResolve(issue.id)}>Resolve</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
const handleResolve = (issueId) => {
    console.log(`Resolving issue with ID: ${issueId}`);
};

export default IssueCard;