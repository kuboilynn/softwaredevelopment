import Input from "../UI/input";
import { useState } from "react";
import '../index.css';
import makerere from "../assets/makererelogo.png"
import Img from "../UI/Img"
import './styles/Login.css';


function Login() {
  const[regno, setRegno]=useState("");
  const [password, setPassword]= useState("");
  const[showError, setShowError]=useState(false);

  function handleRegnoChange(event){
    setRegno(event.target.value);
    setShowError(false);
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handleLogin(){
    if(regno === ""){
      setShowError(true);
    } else {
      setShowError(false);
      console.log("Login attempted with:", {regno,password});

    }
  }

  return (
    <div className="Login">
      <Img src={makerere} alt="Makerere Logo" className="logo"/>
      <p className="access">Access Your Academic Dashboard</p>

      <div className="input-group">
      <Input 
      type="text" 
      value={regno} 
      onChange={handleRegnoChange}
      placeholder="Student No/Reg" 
      className="input-field"
      />
      {showError && <span className="error">Reg no required</span>}
      </div>

      <div className="input-group">
        <input 
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="input-field"
        />
      </div>
      <button className="login-btn" 
            onClick={handleLogin}>
        Login
      </button>

      <p className="signup-link">Don't have an account? <a href="/Register">Signup</a></p> 
    </div>
  );
}

export default Login
