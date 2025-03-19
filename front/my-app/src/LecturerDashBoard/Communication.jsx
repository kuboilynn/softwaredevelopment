import React, {useState}from "react";
import '../pages/styles/Communication.css';

const Communication=()=>{
    const [message, setMessage] = useState("");
    const[student,setStudent] = useState("all");
    const[statusMessage, setStatusMessage] = useState("");

    const sendMessage =()=>{
        if (message.trim()===""){
            setStatusMessage("Please write a message before sending.")
            return;
        }
            // Simulate API request
    setTimeout(() => {
        setStatusMessage("Message sent successfully!");
        setMessage("");
        setStudent("all");
      }, 1000);
    };
    
    return(
        <div className="Communication">
            <h3>Communication</h3>
            
            <label>Message:</label>
            <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Write your message here..."></textarea>

            <label>Select Student:</label>
            <select value={student} onChange={(e) => setStudent(e.target.value)}>
            <option value="all">All Students</option>
            <option value="student1">Student 1</option>
            <option value="student2">Student 2</option>
            </select>

            <button className="Message-button" onClick={sendMessage}>Send Message</button>
            <div className="message">{statusMessage}</div>
        </div>
    );
};
export default Communication;