import "../pages/styles/Dashboard.css";
import { useState } from "react";

function RegFileIssue() {
  const [issue, setIssue] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Issue filed:", issue); // Replace with API call
    setIssue({ title: "", description: "" });
  };

  return (
    <div className="file-issue-container">
      <h2>File a New Issue</h2>
      <form className="issue-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={issue.title}
            onChange={(e) => setIssue({ ...issue, title: e.target.value })}
            placeholder="Enter issue title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={issue.description}
            onChange={(e) => setIssue({ ...issue, description: e.target.value })}
            placeholder="Describe the issue"
            required
          />
        </div>
        <button type="submit" className="submit-btn"> Submit Issue </button>
      </form>
    </div>
  );
}

export default RegFileIssue;
