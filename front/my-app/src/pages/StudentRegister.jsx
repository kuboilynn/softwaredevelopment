import Button from "../UI/Button"
import Input from "../UI/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    navigate("./")

  }
  return(
    <div>
      <h3>Register: Student</h3>
      <Input type="text" value={name} onChange={entername} placeholder="Name"></Input><br/>
      <Input type="text" placeholder="Email"></Input><br/>
      <Input type="text" placeholder="Reg No"></Input><br/>
      <Input type="text"  placeholder="Student No"></Input><br/>
      <Input type="text" placeholder="password"></Input><br/>
      <Input type="text" placeholder="confirm password"></Input><br/>
      <Button onClick={gotoStudentHome}>Signup</Button>
    </div>
  )

}

export default StudentRegister