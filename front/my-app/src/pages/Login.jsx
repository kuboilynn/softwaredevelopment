import Input from "../UI/input";
import { useState } from "react";
import '../index.css';
import makerere from "../assets/makererelogo.png"
import Img from "../UI/Img"
import './styles/Login.css';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { domain } from "../utils/domain";
import { saveToLocalStorage } from "../utils/EncryptDecrypt";


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setShowError(false);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    if (username === "" || password === "") {
      setShowError(true);
      setError("Username and password are required.");
      return;
    }

    setShowError(false);
    setError(""); 
    console.log("Login attempted with:", { username, password });
    setLoading(true);
    handleAuth();
  }


  const handleAuth = () => {
    const loginData = {
      username,
      password,
    };

    fetch(`${domain}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(loginData),
        
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data)
        
        saveToLocalStorage("authInfo", data)
        if (data.accessToken) {
          console.log("Login successful:", data);
          if(data.user.role === "Student"){
            navigate("/StudentHome")
          }else if(data.user.role === "Lecturer"){
            navigate("/LecturerDashBoard/LecHome")
          }else if(data.user.role === "Registrar"){
            navigate("/RegistrarDashboard/RegHome")
          }else{
            navigate("/")
          }
          
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("An error occurred during login. Please try again.");
        console.error("Error during login:", error);
      });

  }

  return (
    <div className="Login">
      <Img src={makerere} alt="Makerere Logo" className="logo" />
      <p className="access">Access Your Academic Dashboard</p>
      <div >
        {loading && <div className="loading-message">Logging in...</div>}
        {error && !loading && <div className="error-message">{error}</div>}
      </div>

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
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="input-field"
        />
        {showError && <span className="error">password required</span>}
      </div>
      <div className="input-group">
        <button className="login-btn"
          onClick={handleLogin}
          disabled={loading}>

          {loading ? "Please Wait ..." : "Login"}
        </button>
      </div>


      <p className="signup-link">
        Don't have an account? <Link to="/Register">Signup</Link>
      </p>

      <p className="forgot-password-link">
        <Link to="/forgot-password">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default Login