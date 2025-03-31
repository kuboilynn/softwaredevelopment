import Img from "../UI/Img"
import makerere from "../assets/makererelogo.png"
import Button from "../UI/Button"
import { useNavigate } from "react-router-dom"
import './styles/Register.css';

 function Register(){
   const navigate=useNavigate()
   
   function gotoLecturerRegister(){
    navigate("/LecturerRegister");
   }

   function gotoStudentRegister(){
    navigate("/StudentRegister")
  }
  function gotoRegistrarRegister(){
    navigate("/RegistrarRegister")
  }
  return(
  
  <div className="register">
    <Img src={makerere} alt="makerere logo" className="logo"/><br/>
    <h3 style={{fontWeight:"bold",fontStyle:"arial"}}>Are you signing up as?</h3>
    <p>Join the Academic Community</p>

  
  <div className="all-Button">

    <Button  className="Student" 
    onClick={gotoStudentRegister} 
    >Student</Button>
    <Button  className="Lecturer" 
    onClick={gotoLecturerRegister}
    >Lecturer</Button>
    <Button  className="Register" 
    onClick={gotoRegistrarRegister}
    >Registrar</Button>

  </div>
    <p className="login-link">
      Already have an account? <a href="/Login">Login</a></p>
  </div>
  )

 }
 export default Register