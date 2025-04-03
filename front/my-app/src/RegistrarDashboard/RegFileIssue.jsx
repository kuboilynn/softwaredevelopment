import "../pages/styles/Dashboard.css";
<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import useApiRequest from "../utils/useApiRequest";
import { domain } from "../utils/domain";
import { getFromLocalStorage } from "../utils/EncryptDecrypt";

function RegFileIssue() {
  const { postRequest, loading } = useApiRequest()
  const { lecturerIssues, setLecturerIssues } = useOutletContext(); // Access and update context
  const [issue, setIssue] = useState({ title: "", message: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const loggedInUser = getFromLocalStorage("authInfo");
    setLoggedUser(loggedInUser.user)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notificationNew = {
      user_id: loggedUser.user.id,
      title: issue.title,
      message: issue.message
    };

    const req = await postRequest(`${domain}/notifications`, notificationNew)
    console.log(req);

    if (req.status === 201) {
      setStatusMessage("Notification sent successfully!");
      setIssue({ title: "", message: "" })
    } else {
      console.error('Error sending message:');
      setStatusMessage("Failed to send notification. Please try again.");
>>>>>>> Lynn
    }
  };

  return (
    <div className="file-issue-container">
      <h2>Send Out A Notification</h2>
      <form className="issue-form" onSubmit={handleSubmit}>
        {statusMessage && <div className="status-message" style={{padding:"5px 0"}}>{statusMessage}</div>}
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
          <label>Notification</label>
          <textarea
            value={issue.message}
            onChange={(e) => setIssue({ ...issue, message: e.target.value })}
            placeholder="Notification body"
            required
          />
        </div>
<<<<<<< HEAD
        <button type="submit" className="submit-btn">Submit Issue</button>
=======
        <button type="submit" className="submit-btn">{loading ? "Please Wait ..." : "Submit Notification"}</button>
>>>>>>> Lynn
      </form>
      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </div>
  );
}

export default RegFileIssue;