import { Link, Outlet } from 'react-router-dom';
import { FaBars, FaHome, FaFlag, FaUser, FaFileAlt } from 'react-icons/fa';
import { useState } from 'react';
import './LecturerDashBoard.css';

function LecDashboard() {
  const [dashboard, setDashboard] = useState(false);

  const toggleDashboard = () => setDashboard(!dashboard);

  return (
    <div className="dashboard-container">
      <header className="dashhead">
        <Link to="#" className="toggle-btn" onClick={toggleDashboard}>
          <FaBars />
        </Link>
        <h1 className="dashboard-title">Lecturer Dashboard</h1>
      </header>

      <nav className={`sidebar ${dashboard ? 'active' : 'closed'}`}>
        <ul className="sidebar-items">
          <li className="sidebar-item">
            <Link to="/LecturerDashBoard/LecHome" className="sidebar-link">
              <FaHome className="icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/LecturerDashBoard/LecIssueCard" className="sidebar-link">
              <FaFlag className="icon" />
              <span>IssueCard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/LecturerDashBoard/LecCommunication" className="sidebar-link">
              <FaFileAlt className="icon" />
              <span>Communication</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/LecturerDashBoard/LecProfile" className="sidebar-link">
              <FaUser className="icon" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      <main className={`main-content ${dashboard ? 'shifted' : ''}`}>
        <Outlet /> {/* Renders the nested route components here */}
      </main>
    </div>
  );
}

export default LecDashboard;









