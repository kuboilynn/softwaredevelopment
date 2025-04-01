import { Link, Outlet } from 'react-router-dom';
import { FaBars, FaHome, FaFlag, FaUser, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import './RegistrarDashBoard.css';

function RegistrarDashboard() {
  const [dashboard, setDashboard] = useState(false);

  const toggleDashboard = () => setDashboard(!dashboard);

  return (
    <div className="dashboard-container">
      <header className="dashhead">
        <Link to="#" className="toggle-btn" onClick={toggleDashboard}>
          <FaBars />
        </Link>
        <h1 className="dash-title">Registrar Dashboard</h1>
      </header>

      <nav className={`sidebar ${dashboard ? 'active' : 'closed'}`}>
        <ul className="sidebar-items">
          <li className="sidebar-item">
            <Link to="/RegistrarDashboard/RegHome" className="sidebar-link">
              <FaHome className="icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/RegistrarDashboard/RegIssue" className="sidebar-link">
              <FaFlag className="icon" />
              <span>Issues</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/RegistrarDashboard/RegFileIssue" className="sidebar-link">
              <FaFileAlt className="icon" />
              <span>File Issue</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/RegistrarDashboard/RegProfile" className="sidebar-link">
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

export default RegistrarDashboard;
