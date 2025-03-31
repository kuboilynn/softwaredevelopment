import Button from "../UI/Button"
import Input from "../UI/input";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import students from"../assets/study-group-african-people.jpg"
import '../pages/styles/studentRegister.css';


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

export default RegistrarRegister