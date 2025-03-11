import { useNavigate } from "react-router-dom"
import makerere from "../assets/makererelogo.png"
import Button from "../UI/Button"
import Img from "../UI/Img"
import './styles/RegLogin.css';

function RegisterandLogin(){

  const navigate=useNavigate()
  function GotoLogin(){
    navigate("/Login")

  }

  function GotoRegister(){
    navigate("/Register")

  }

  return (
    <div className="container">
      <title>Academic Issue Tracking System</title>
      <h1>Academic Issue Tracking System</h1>
      <Img src={makerere} alt="makerere logo"/>

      <div className="Buttons">
      <Button className="login" onClick={GotoLogin}>Login</Button>
      <Button  className="Register" onClick={GotoRegister}>Register</Button>
      </div>
      
    </div>
  )

}

export default RegisterandLogin;