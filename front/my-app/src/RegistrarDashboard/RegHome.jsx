import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import './RegHome.css';

function RegHome() {
  const navigate = useNavigate();
  const { lecturerIssues } = useOutletContext(); // Access issues from context
  const pendingIssues = lecturerIssues.filter(issue => issue.status === "Pending").length;

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
            <h3>Lecturer Submission</h3>
            <p>Pending review: Assignment details</p>
          </div>
          <div className="card">
            <h3>Notification</h3>
            <p>New issue reported</p>
            <div className="notification">
              <FaBell className="bell-icon" />
              {pendingIssues > 0 && (
                <span className="notification-badge">{pendingIssues}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegHome;