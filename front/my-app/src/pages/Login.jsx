import Input from "../UI/input";
import { useState } from "react";
import '../index.css';
import makerere from "../assets/makererelogo.png"
import Img from "../UI/Img"
import Button from "../UI/Button"
import './styles/Login.css';

function Login() {

  const[email,setemail]=useState();

  function enteremail(event){
    setemail(event.target.value);


  }
  return (
    <div className="Login">
      <h3>Login</h3>
      <Img src={makerere} alt="Makerere Logo"/>
      <Input type="text" value={email} onchange={enteremail}></Input><br/>
      <Input type="text" value={email} onchange={enteremail}></Input><br/>
      <Button>Login</Button>
      <p>Don't have an account? Signup</p> 
    </div>
  )
}

export default Login
