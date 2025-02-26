import Input from "../UI/input";
import { useState } from "react";
import '../index.css';

function Login() {

  const[email,setemail]=useState();

  function enteremail(event){
    setemail(event.target.value);


  }
  return (
    <div className="Login">
      <h3> Login</h3>
      
      <Input type="text" value={email} onchange={enteremail}></Input>
    </div>
  )
}

export default Login
