import Input from "../UI/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion"
import '../pages/styles/AllRegister.css';


function LecturerRegister(){
  const navigate=useNavigate();
  const[name,setName]=useState("");
  const[showError, setShowError]=useState(false);

  function handleNameChange(event){
    setName(event.target.value);
    setShowError(false);
  }


  function gotoLecturerHome(){
    if (name ===""){
      setShowError(true);
    } else{
      setShowError(false);
      navigate("/LecturerDashboard/Home")
    }
    
  }
  return(
    
      <div className="student-form">
      <h3><i className="fas fa-user-graduate"></i>Register: Lecturer</h3>
      <motion.p initial={{opacity: 0, y: -50}}
      animate={{ opacity: 1, y: 0}}
      className="tagline">Shape Minds, Drive Knowledge, and Inspire Innovation</motion.p>
      
      <div className="Input-group">
      <Input 
      type="text" 
      value={name}
      onChange={handleNameChange}
      placeholder="Name"
      className="Input-field"
      />
      {showError && <span className="error">*Required</span>}
      </div>
 

      <div className="Input-group">
      <Input type="email" placeholder="Email" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="text" placeholder="ID No" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="text" placeholder="Program" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="office" placeholder="Office" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="password" placeholder="Password" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="password" placeholder="Confirm Password" className="Input-field"/>
      </div>
      
      <button className="signup-btn"
      onClick={gotoLecturerHome}>
        <i className="fas fa-user-plus"></i>Signup</button>
    </div>
  );
}

export default LecturerRegister

/* <motion.h1 initial={{opacity: 0, y: -50}}
      animate={{ opacity: 1, y: 0}}
      >Academic Issue Tracking System</motion.h1>*/