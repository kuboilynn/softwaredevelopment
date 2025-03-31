import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationCircle, FaComments, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "../pages/styles/SideBar.css";

const SideBar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate('/');
    console.log('User logged out - redirected to first page');
};

  return (
    <div className={`SideBar ${isOpen ? "open" : "closed"}`}>
      <div className="toggle-container">
        <button onClick={toggleSidebar} className="toggle-button">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>


      <ul className="nav-list">
        <li className="nav-item">
          <FaHome className="nav-icon" style={{ marginRight: isOpen ? "10px" : "0" }} />
          {isOpen && <Link to="/lecturerDashBoard/home" className="nav-link">Home</Link>}
        </li>

        <li className="nav-item">
          <FaExclamationCircle className="nav-icon" style={{ marginRight: isOpen ? "10px" : "0" }} />
          {isOpen && (
            <>
              <Link to="/lecturerDashBoard/issues" className="nav-link">Issues</Link>
              <span className="badge">3</span>
            </>
          )}
        </li>

        <li className="nav-item">
          <FaComments className="nav-icon" style={{ marginRight: isOpen ? "10px" : "0" }} />
          {isOpen && (
            <>
              <Link to="/lecturerDashBoard/communication" className="nav-link">Communication</Link>

            </>
          )}
        </li>

        <li className="nav-item">
          <FaUser className="nav-icon" style={{ marginRight: isOpen ? "10px" : "0" }} />
          {isOpen && <Link to="/lecturerDashBoard/profile" className="nav-link">Profile</Link>}
        </li>
      </ul>

    
      {isOpen && (
        <div className="logout-container">
          <button 
           onClick={handleLogout} 
           className="logout-button">
            <FaSignOutAlt className="logout-icon" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
