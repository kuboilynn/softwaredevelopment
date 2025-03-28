import Button from "../UI/Button"
import Input from "../UI/input";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import '../pages/styles/StudentRegister.css';


function LecturerRegister(){
  const navigate=useNavigate()
  const[name,setname]=useState()
  function entername(event){
    if(setname===""){
      return"*required"

    }
    setname(event.target.value);
  }

  function gotoStudentHome(){
    navigate("/LecturerDashboard/Home")

  }
  return(
    
      <div className="student-form">
      <h3>Register: Lecturer</h3>
      <Input type="text" value={name} onChange={entername} placeholder="Name"></Input><br/>
      <Input type="text" placeholder="Email"></Input><br/>
      <Input type="text" placeholder="Reg No"></Input><br/>
      <Input type="text"  placeholder="Program"></Input><br/>
      <Input type="text"  placeholder="office"></Input><br/>
      <Input type="text" placeholder="password"></Input><br/>
      <Input type="text" placeholder="confirm password"></Input><br/>
      <Button onClick={gotoStudentHome}>Signup</Button>
    </div>
 
  )

}

export default LecturerRegister