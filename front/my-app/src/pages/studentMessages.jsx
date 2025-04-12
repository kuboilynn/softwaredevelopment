import { useEffect, useState } from "react";
import DashboardStudent from "./DashboardStudent";
import useApiRequest from "../utils/useApiRequest";
import { domain } from "../utils/domain";
import './styles/student.css';

function StudentMessages() {
  const { getRequest } = useApiRequest();
  const [notifications, setNotifications] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const req = await getRequest(`${domain}/notifications`);
        if (req.status === 200) {
          setNotifications(req.body);
          setError(null);
        } else {
          setError("Failed to fetch notifications.");
        }
      } catch (err) {
        setError("Something went wrong while fetching messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div>
      <DashboardStudent />
      <div className="content">

        {/* Sidebar notifications */}
        <div className="notifications">
          <ul className="notificationslist">
            {loading && (
              <li className="noty">
                <strong>Loading messages...</strong>
              </li>
            )}

            {error && (
              <li className="noty error">
                <strong>{error}</strong>
              </li>
            )}

            {!loading && !error && notifications.length === 0 && (
              <li className="noty">
                <strong>No notifications available.</strong>
              </li>
            )}

            {notifications.map((message) => (
              <li
                key={message.id}
                className="noty"
                onClick={() => handleMessageClick(message)}
              >
                <div>
                  <strong className="sender">
                    {message.user?.first_name} {message.user?.last_name}
                  </strong><br />
                  <span className="time">{message.created_at}</span>
                  <p className="title">{message.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected message viewer */}
        <div className="actualmessage">
          {selectedMessage ? (
            <div className="openedmessage">
              <h2 className="sender">
                {selectedMessage.user?.first_name} {selectedMessage.user?.last_name}
              </h2>
              <small className="time">{selectedMessage.created_at}</small>
              <h3 className="title">{selectedMessage.title}</h3>
              <p>{selectedMessage.message}</p>
            </div>
          ) : (
            <p className="openedmessage">Click on a message to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentMessages;
