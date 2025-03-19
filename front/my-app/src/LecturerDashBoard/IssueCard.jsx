import React from "react";
import '../pages/styles/IssueCard.css';

const IssueCard = ({issue}) =>{
    return(
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
            <button className="resolve-button">Resolve</button>
            <button className="communication-button">Communication</button>
            </td>
            </tr>
            </tbody>
            

        </table>
    );
}

export default IssueCard;



/*import React from "react";
import '../pages/styles/IssueCard.css';

const IssueCard = ({issue})=>{
    if(!issue) {
        return <div>Loading.....</div>
    }
    console.log(issue);
    return(
        <div className="Issue-card">
            <h3>{issue.title}</h3>
            <p><strong>Student:</strong>{issue.students}</p>
            <p><strong>Status:</strong>{issue.status}</p>
            <p>{issue.description}</p>
            <button className="resolve-button">Resolve</button>
            <button className="communication-button">Communication</button>
        </div>
    )
}
export default IssueCard;*/