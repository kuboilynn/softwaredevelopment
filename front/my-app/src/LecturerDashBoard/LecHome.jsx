import React from "react";
import { useOutletContext } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../pages/styles/LecHome.css';
import image1 from '../assets/images/image1.png';

const LecHome = () => {
  const { studentIssues } = useOutletContext();
  const pendingIssues = studentIssues.filter(issue => issue.status === "Pending").length;

  return (
    <div className="home">
      <div className="banner">
        <img src={image1} alt="Banner" className="banner-image" />
        <div className="overlay">
          <h2 className="animated-title">Welcome to Your Dashboard</h2>
          <p>Your space to manage everything effortlessly</p>
          <div className="notification-card">
            <div className="notification">
              <FaBell className="bell-icon" />
              {pendingIssues > 0 && (
                <span className="notification-badge">{pendingIssues}</span>
              )}
            </div>
          </div>
          <button className="go-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default LecHome;