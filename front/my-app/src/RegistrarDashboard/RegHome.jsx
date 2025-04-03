
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import './RegHome.css';
import useApiRequest from '../utils/useApiRequest';
import { domain } from '../utils/domain';

function RegHome() {
  const { getRequest, loading } = useApiRequest()
  const navigate = useNavigate();
  const { lecturerIssues } = useOutletContext(); // Access issues from context
  const pendingIssues = lecturerIssues.filter(issue => issue.status === "pending").length;
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchNotifications();
  }, [])


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
      console.log("done!")
    }
  };


  function GotoDashboard() {
    navigate("/RegistrarDashboard/Dashboard");
  }

  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-overlay">
          <h1>Welcome, Registrar!</h1>
          <p>Stay updated with lecturer submissions and manage your tasks effortlessly.</p>
          <button className="Dashboard" onClick={GotoDashboard}>
            <i className="fas fa-sign-in-alt"></i> Go to Registrar Dashboard
          </button>
        </div>
      </div>
      <div className="home-content">
        <h2>Recent Updates</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Notifications</h3>
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

            {notifications.slice(0, 3).map((message) => (
              <li
                key={message.id}
                className="noty"
                style={{listStyle:"none"}}
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
          </div>
          <div className="card">

            <h3>Submissions</h3>
            <p style={{ fontWeight: 900 }}>New issue reported</p>

            <div className="notification">
              <FaBell className="bell-icon" />
              {pendingIssues > 0 && (
                <span className="notification-badge">{pendingIssues}</span>
              )}


            </div>
            {lecturerIssues.filter(issue => issue.status === "pending").length > 0 ? (
              lecturerIssues.filter(issue => issue.status === "pending").slice(0,4).map((issue) => (
                <div
                  style={{ padding: "10px 0", borderBottom: "1px solid #aaa" }}
                  key={issue.id}
                  className={`issue-card-row ${issue.status === 'Resolved' ? 'resolved' : ''}`}
                >
                  <p style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.875rem" }}>{`${issue.student.first_name} ${issue.student.last_name}` || 'Unknown Student'}</span>
                    <span style={{ fontSize: "0.875rem" }}>{new Date(issue.submission_date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      //timeZoneName: "short"
                    }) || 'Not set'}</span>
                    <span style={{ fontSize: "0.875rem" }} className={`status-badge ${issue.status?.toLowerCase()}`}>
                      {issue.status || 'Pending'}
                    </span>
                  </p>
                  <p>{issue.description || 'No description'}</p>
                </div>
              ))
            ) : (
              <p>No issues found</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegHome;