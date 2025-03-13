import React from "react";
import '../pages/styles/IssueCard.css';

const IssueCard = ({issue})=>{
    if(!issue) {
        return <div>Loading.....</div>
    }
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
export default IssueCard;