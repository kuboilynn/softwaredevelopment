
import React, { useState, useEffect } from "react";

import { useOutletContext } from 'react-router-dom';
import '../pages/styles/LecCommunication.css';
import { getFromLocalStorage } from "../utils/EncryptDecrypt";
import { domain } from "../utils/domain";
import useApiRequest from "../utils/useApiRequest";

const LecCommunication = () => {

  const { postRequest, loading } = useApiRequest()

  const { studentIssues } = useOutletContext(); // Get student issues from LecDashboard
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("all"); // Changed from "student" to "recipient" for clarity
  const [statusMessage, setStatusMessage] = useState("");

  const [loggedUser, setLoggedUser] = useState(null)


  useEffect(() => {
    const loggedInUser = getFromLocalStorage("authInfo");
    setLoggedUser(loggedInUser.user)
  }, [])

  // Extract unique student names from issues
  const students = [...new Set(studentIssues.map(issue => `${issue.student.first_name} - ${issue.student.last_name}`))];

  const sendMessage = async () => {
    if (message.trim() === "") {
      setStatusMessage("Please write a message before sending.");
      return;
    }

    const messageData = {
      recipient: recipient === "registrar" ? "registrar" : recipient, // "all" or specific student
      message,
      sender: loggedUser && loggedUser.user.id, // Replace with actual lecturer ID/name from profile
    };

    const req = await postRequest(`${domain}/send-email`, messageData)
    console.log(req);

    if (req.status === 200) {
      setStatusMessage("Message sent successfully!");
      setMessage("");
      setRecipient("all");
    } else {
      console.error('Error sending message:');

      setStatusMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="Communication">
      <h3>Communication</h3>

      <label>Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        placeholder="Write your message here..."
      ></textarea>

      <label>Select Recipient:</label>
      <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
        <option value="all">All Students</option>
        {students.map((student, index) => (
          <option key={index} value={student}>{student}</option>
        ))}

      </select>

      <button className="Message-button" onClick={sendMessage}>{loading ? "Sending Email" : "Send Message"}</button>

      <div className="message">{statusMessage}</div>
    </div>
  );
};

export default LecCommunication;