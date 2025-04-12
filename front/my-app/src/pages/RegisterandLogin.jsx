import React from "react";
import { useNavigate } from "react-router-dom";
import makerere from "../assets/makererelogo.png";
import Button from "../UI/Button";
import Img from "../UI/Img";
import { motion } from "framer-motion";
import 'font-awesome/css/font-awesome.min.css';  
import './styles/RegLogin.css';

function RegisterandLogin() {
  const navigate = useNavigate();
  
  function GotoLogin() {
    navigate("/Login");
  }

  function GotoRegister() {
    navigate("/Register");
  }

  return (
    <div className="container">
      <title>Academic Issue Tracking System</title>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Academic Issue Tracking System
      </motion.h1>

      <Img src={makerere} alt="makerere logo" className="logo" />

      <div className="Buttons">
      <Button className="login" onClick={GotoLogin}>
          <i className="fas fa-sign-in-alt"></i> Login
        </Button>

        <Button className="Register" onClick={GotoRegister}>
          <i className="fas fa-user-plus"></i>Register
        </Button>
      </div>
    </div>
  );
}

export default RegisterandLogin;
