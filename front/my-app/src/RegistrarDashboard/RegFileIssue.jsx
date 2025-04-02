import "../pages/styles/Dashboard.css";
import { useState } from "react";
import { useOutletContext } from 'react-router-dom';

function RegFileIssue() {
  const { lecturerIssues, setLecturerIssues } = useOutletContext(); // Access and update context
  const [issue, setIssue] = useState({ title: "", description: "" });
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIssue = {
      id: Date.now().toString(), // Temporary ID, replace with backend-generated UUID
      title: issue.title,
      description: issue.description,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3001/api/submit-registrar-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue),
      });

      if (!response.ok) {
        throw new Error('Failed to submit issue');
      }

      // Update local context with the new issue
      setLecturerIssues([...lecturerIssues, newIssue]);
      setIssue({ title: "", description: "" });
      setStatusMessage("Issue submitted successfully!");
    } catch (error) {
      console.error('Error submitting issue:', error);
      setStatusMessage("Failed to submit issue. Please try again.");
    }
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
        <button type="submit" className="submit-btn">Submit Issue</button>
      </form>
      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </div>
  );
}

export default RegFileIssue;