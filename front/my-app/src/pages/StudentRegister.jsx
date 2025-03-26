import Button from "../UI/Button"
import Input from "../UI/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './styles/studentRegister.css';
import students_image from "../assets/study-group-african-people.jpg"

function StudentRegister(){
  const navigate=useNavigate()
  const[name,setname]=useState()
  function entername(event){
    if(setname===""){
      return"*required"

    }
    setname(event.target.value);
  }

  function gotoStudentHome(){
    navigate("/StudentHome")

  }
  return(
    <>
    <div className="registerStudent">
      <h1>Register:Students</h1>
      <Input type="text" value={name} onChange={entername} placeholder="Name"></Input><br/>
      <Input type="text" placeholder="Email"></Input><br/>
      <Input type="text" placeholder="Reg No"></Input><br/>
      <Input type="text"  placeholder="Student No"></Input><br/>
      <Input type="text" placeholder="password"></Input><br/>
      <Input type="text" placeholder="confirm password"></Input><br/>
      <Button onClick={gotoStudentHome}>Signup</Button>
      <p>already have account <href>Login</href>?</p>
    </div>
    <img className="image"src={students_image} alt="students"/>
    </>
    
    
  )

}

export default StudentRegister