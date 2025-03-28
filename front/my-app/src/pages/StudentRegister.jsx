import Input from "../UI/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../pages/styles/AllRegister.css';
import { motion } from "framer-motion";



function StudentRegister(){
  const navigate=useNavigate();
  const[name,setName]=useState("");
  const[showError, setShowError]=useState(false);

  function handleNameChange(event){
    setName(event.target.value);
    setShowError(false);
  }


  function gotoStudentHome(){
    if (name ===""){
      setShowError(true);
    } else{
      setShowError(false);
      navigate("/StudentHome")
    }
    
  }
  return(
    
      <div className="student-form">
      <h3><i className="fas fa-user-graduate"></i>Register: Student</h3>
      <motion.p initial={{opacity: 0, y: -50}}
      animate={{ opacity: 1, y: 0}}className="tagline">Start Your Academic Journey</motion.p>
      
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
      <Input type="text" placeholder="Reg No" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="text" placeholder="Student No" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="password" placeholder="Password" className="Input-field"/>
      </div>

      <div className="Input-group">
      <Input type="password" placeholder="Confirm password" className="Input-field"/>
      </div>
      
      <button className="signup-btn"
      onClick={gotoStudentHome}>
        <i className="fas fa-user-plus"></i>Signup</button>
    </div>
  );
}

export default StudentRegister