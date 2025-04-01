import { Link, Outlet } from 'react-router-dom';
import { FaBars, FaHome, FaFlag, FaUser, FaFileAlt } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import './RegistrarDashBoard.css';

function RegistrarDashboard() {
  const [dashboard, setDashboard] = useState(false);

  const toggleDashboard = () => setDashboard(!dashboard);

 
  const sidebarVariants = {
    active: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  
  const mainVariants = {
    shifted: {
      marginLeft: "250px", 
      transition: { ease: "easeInOut", duration: 0.3 },
    },
    initial: {
      marginLeft: "0",
      transition: { ease: "easeInOut", duration: 0.3 },
    },
  };

 
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1, 
        duration: 0.3,
      },
    }),
  };


  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="dashboard-container">
      <motion.header
        className="dashhead"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
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
          </ul>
        </motion.nav>
      </AnimatePresence>

      <motion.main
        className={`main-content ${dashboard ? 'shifted' : ''}`}
        initial="initial"
        animate={dashboard ? "shifted" : "initial"}
        variants={mainVariants}
      >
        <Outlet /> 
      </motion.main>
    </div>
  );
}

export default RegistrarDashboard;