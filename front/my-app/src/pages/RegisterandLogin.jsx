import React from "react";
import { useNavigate } from "react-router-dom";
import makerere from "../assets/makererelogo.png";
import Button from "../UI/Button";
import Img from "../UI/Img";
import { motion } from "framer-motion";
import 'font-awesome/css/font-awesome.min.css';  
import './styles/RegLogin.css';
import { useState } from "react";

function RegisterandLogin() {
  const navigate = useNavigate();
  const [error,setError] = useState(false);
  
  
  function GotoLogin() {

    navigate("/Login");
    setError((preverror)=>({...preverror, error: false}));
  }

  function GotoRegister() {
    navigate("/Register");
    setError((preverror)=>({...preverror, error: false}));
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
