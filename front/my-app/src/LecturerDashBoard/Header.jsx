import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion"; 
import '../pages/styles/Header.css';

const Header =()=>{
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        console.log('User logged out - redirected to first page');
    };
    
    return (
        <motion.header
        className="header"
        initial={{ opacity: 0, y: -50}}
        animate={{opacity:1, y: 0}}
        transition={{duration: 0.5}}>
            <div className="Lecturer">
                <FaChalkboardTeacher style={{ marginRight: "10px", color: "#fff"}}/>
            <motion.h1
            initial={{scale: 0.8}}
            animate={{scale: 1}}
            transition={{duration: 0.3}}
            >
                Lecturer
                </motion.h1>
            </div>

            <div className="header-actions">
            <motion.button
             onClick={handleLogout} 
             className="Logout-button"
             whileHover={{scale: 1.05}}
             whileTap={{scale: 0.95}}
             >
                Logout
                </motion.button>    
            </div>

        </motion.header>
    );
};
export default Header;