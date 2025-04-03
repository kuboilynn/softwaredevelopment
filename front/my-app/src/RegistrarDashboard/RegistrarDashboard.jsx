import { Link, Outlet } from 'react-router-dom';
import { FaBars, FaHome, FaFlag, FaUser, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useApiRequest from '../utils/useApiRequest';
import { domain } from '../utils/domain';
import './RegistrarDashBoard.css';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/EncryptDecrypt';

function RegistrarDashboard() {
  const navigate = useNavigate()
  const { getRequest, postRequest, loading } = useApiRequest()
  const [dashboard, setDashboard] = useState(false);
  const [lecturerIssues, setLecturerIssues] = useState([]);
  const [error, setError] = useState(null)
  const toggleDashboard = () => setDashboard(!dashboard);

  const handleLogout = async () => {
    console.log(getFromLocalStorage("authInfo"))
    const response = await postRequest(`${domain}/accounts/logout`, { "refresh": getFromLocalStorage("authInfo").refreshToken });
    console.log(response);
    if (response.status === 205) {
      localStorage.removeItem("authInfo")
      localStorage.removeItem("isLoggedIn")
      navigate('/login');
    } else {
      console.log("Logout failed");
    }
  }

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const req = await getRequest(`${domain}/submissions`);
        if (req.status === 200) {
          console.log(req.body)
          setLecturerIssues(req.body);
          setError(null);
        } else {
          setError("Failed to fetch submissions.");
        }
      } catch (err) {
        setError("Something went wrong while fetching submissions.");
      } finally {
        console.log("done")
      }
    };

    fetchSubmissions();
  }, []);

  const sidebarVariants = {
    active: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const mainVariants = {
    shifted: { marginLeft: "250px", transition: { ease: "easeInOut", duration: 0.3 } },
    initial: { marginLeft: "0", transition: { ease: "easeInOut", duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.3 } }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="dashboard-container">
      <motion.header className="dashhead" initial="hidden" animate="visible" variants={titleVariants}>
        <Link to="#" className="toggle-btn" onClick={toggleDashboard}>
          <FaBars />
        </Link>
        <h1 className="dash-title">Registrar Dashboard</h1>
      </motion.header>

      <AnimatePresence>
        <motion.nav
          className={`sidebar ${dashboard ? 'active' : 'closed'}`}
          initial="closed"
          animate={dashboard ? "active" : "closed"}
          variants={sidebarVariants}
        >
          <ul className="sidebar-items">
            {[
              { to: "/RegistrarDashboard/RegHome", icon: FaHome, text: "RegHome" },
              { to: "/RegistrarDashboard/RegIssue", icon: FaFlag, text: "RegIssue" },
              { to: "/RegistrarDashboard/RegFileIssue", icon: FaFileAlt, text: "RegFileIssue" },
              { to: "/RegistrarDashboard/RegProfile", icon: FaUser, text: "RegProfile" },
            ].map((item, index) => (
              <motion.li
                key={item.text}
                className="sidebar-item"
                custom={index}
                initial="hidden"
                animate={dashboard ? "visible" : "hidden"}
                variants={itemVariants}
              >
                <Link to={item.to} className="sidebar-link">
                  <item.icon className="icon" />
                  <span>{item.text}</span>
                </Link>
              </motion.li>
            ))}
            <li>
              <Link onClick={handleLogout}>
                <FaSignOutAlt style={{ color: "red" }} /> Logout
              </Link>
            </li>
          </ul>
        </motion.nav>
      </AnimatePresence>

      <motion.main
        className={`main-content ${dashboard ? 'shifted' : ''}`}
        initial="initial"
        animate={dashboard ? "shifted" : "initial"}
        variants={mainVariants}
      >
        <Outlet context={{ lecturerIssues, setLecturerIssues, loading }} />
      </motion.main>
    </div>
  );
}

export default RegistrarDashboard;