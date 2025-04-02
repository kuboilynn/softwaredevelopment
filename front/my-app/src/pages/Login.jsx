import Input from "../UI/input";
import { useState } from "react";
import '../index.css';
import makerere from "../assets/makererelogo.png"
import Img from "../UI/Img"
import './styles/Login.css';
import { useNavigate } from "react-router-dom"


function Login() {
  const navigate=useNavigate
  const[username, setUsername]=useState("");
  const [password, setPassword]= useState("");
  const[showError, setShowError]=useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  function handleUsernameChange(event){
    setUsername(event.target.value);
    setShowError(false);
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handleLogin(){
    if(username === ""){
      setShowError(true);
    } else {
      setShowError(false);
      console.log("Login attempted with:", {username,password});

    }
  }

  const loginData = {
    username,
    password,
  };

 
  fetch("https://mukisamark.pythonanywhere.com/accounts/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json()) 
    .then((data) => {
      setLoading(false); 
      if (data.success) {
       
        console.log("Login successful:", data);

       navigate("/StudentHome")
      } else {
       
        setError(data.message || "Login failed. Please try again.");
      }
    })
    .catch((error) => {
      setLoading(false);
      setError("An error occurred during login. Please try again.");
      console.error("Error during login:", error);
    });


  return (
    <div className="Login">
      <Img src={makerere} alt="Makerere Logo" className="logo"/>
      <p className="access">Access Your Academic Dashboard</p>

      <div className="input-group">
      <Input 
      type="text" 
      value={username} 
      onChange={handleUsernameChange}
      placeholder="User name" 
      className="input-field"
      />
      {showError && <span className="error">User name required</span>}
      </div>

      <div className="input-group">
        <input 
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="input-field"
        />
        {showError && <span className="error">password required</span>}
      </div>
      <button className="login-btn" 
            onClick={handleLogin}
            disabled={loading}>
              
        Login
      </button>
      

      <p className="signup-link">Don't have an account? <a href="/Register">Signup</a></p> 

      <p className="forgot-password-link">
  <a href="mailto:support@yourwebsite.com?subject=Password Reset Request">
    Forgot Password?
  </a>
</p>
<div >
        {loading && <div className="loading-message">Logging in...</div>}
        {error && !loading && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Login
