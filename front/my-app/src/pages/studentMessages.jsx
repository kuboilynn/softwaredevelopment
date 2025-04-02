import { useEffect, useState } from "react";
import DashboardStudent from "./DashboardStudent";
import './styles/student.css';

function StudentMessages() {
 
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "System",
      text: "Welcome to your notifications, student! You will receive updates here.",
      timestamp: "2025-04-01 14:00",
    }
  ]);

  
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  useEffect(() => {
   
    fetch("https://mukisamark.pythonanywhere.com/notifications")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data); 
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message); 
        setLoading(false); 
      });
  }, []);

 
  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

 
  return (
    <div>
      <DashboardStudent />
      <div className="content">
        
        <div className="notifications">
          <ul className="notificationslist">
          {loading && (
              <li className="noty">
                <div>
                  <strong>Loading messages...</strong>
                </div>
              </li>
            )}
            {error && (
              <li className="noty error">
                <div>
                  <strong>Error: {error}</strong>
                </div>
              </li>
            )}
            {messages.map((message) => (
              <li className="noty" key={message.id} onClick={() => handleMessageClick(message)}>
                <div>
                  <strong className="sender">{message.sender}</strong><br/>
                  <span className="time">{message.timestamp}</span>
                </div>
                
              </li>
            ))}
          </ul>
        </div>

       
        <div className="actualmessage">
          {selectedMessage ? (
            <div className="openedmessage">
              <h2 className="sender">{selectedMessage.sender}</h2>
              <small className="time">{selectedMessage.timestamp}</small>
              <p>{selectedMessage.text}</p>
              
            </div>
          ) : (
            <p>Click on a message to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentMessages;
