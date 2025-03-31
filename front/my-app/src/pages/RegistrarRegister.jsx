import Input from "../UI/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../pages/styles/AllRegister.css';
import { motion } from "framer-motion"


function RegistrarRegister(){
  const navigate=useNavigate();
  const[name,setName]=useState("");
  const[showError, setShowError]=useState(false);

  function handleNameChange(event){
    setName(event.target.value);
    setShowError(false);
  }


  function gotoRegistrarHome(){
    if (name ===""){
      setShowError(true);
    } else{
      setShowError(false);
      navigate("/RegistrarDashboard/Home")
    }
    
  }
  return(
    
      <div className="student-form">
      <h3><i className="fas fa-user-graduate"></i>Register: Registrar</h3>
      <motion.p initial={{opacity: 0, y: -50}}
      animate={{ opacity: 1, y: 0}}
      className="tagline">Streamline Academic Operations and Support Success</motion.p>
      
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
      <Input type="text" placeholder="College" className="Input-field"/>
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
      onClick={gotoRegistrarHome}>
        <i className="fas fa-user-plus"></i>Signup</button>
    </div>
  );
}

export default RegistrarRegister



/*import Button from "../UI/Button"
import Input from "../UI/input";
import { useNavigate } from "react-router-dom";

import { useState } from "react";


import '../pages/styles/AllRegister.css';



function RegistrarRegister(){
  const navigate=useNavigate()
  const[name,setname]=useState()
  function entername(event){
    if(setname===""){
      return"*required"

    }
    setname(event.target.value);
  }

  function gotoRegistrarHome(){
    navigate("/RegistrarDashboard/Home")

  }
  return(
    <>
    <img src={students} alt="students" className="image"/>
    <h3>Register: Registrar</h3>
      <div className="student-form">
      
      <Input type="text" value={name} onChange={entername} placeholder="Name"></Input><br/>
      <Input type="text" placeholder="Email"></Input><br/>
      <Input type="text" placeholder="Reg No"></Input><br/>
      <Input type="text"  placeholder="College"></Input><br/>
      <Input type="text" placeholder="password"></Input><br/>
      <Input type="text" placeholder="confirm password"></Input><br/>
      <Button onClick={gotoRegistrarHome}>Signup</Button>
    </div>
    </>
  )

}

export default RegistrarRegister*/