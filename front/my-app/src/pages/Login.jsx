import Input from "../UI/input";
import { useState } from "react";
import '../index.css';
import makerere from "../assets/makererelogo.png"
import Img from "../UI/Img"
import Button from "../UI/Button"
import './styles/Login.css';

function Login() {

  const[regno,setregno]=useState();

  function enterregno(event){
    if (setregno===""){
      return "reg no required"
    }
    setregno(event.target.value);


  }
  return (
    <div className="Login">
      <h3>Login</h3>
      <Img src={makerere} alt="Makerere Logo"/>
      <Input type="text" value={regno} onchange={enterregno}placeholder="Student no/Reg"></Input><br/>
      <Input type="text" value={regno} onchange={enterregno}placeholder="Name"></Input><br/>
      <Button>Login</Button>
      <p>Don't have an account? Signup</p> 
    </div>
  )
}

export default Login
