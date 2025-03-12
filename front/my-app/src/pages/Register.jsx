import Img from "../UI/Img"
import makerere from "../assets/makererelogo.png"
import Button from "../UI/Button"
import { useNavigate } from "react-router-dom"
import './styles/Register.css';

 function Register(){
   const navigate=useNavigate()
   function gotoStudentRegister(){
    navigate("/StudentRegister")
  
   }
  
  return(
  
  <div className="register">
    <Img src={makerere} alt="makerere logo"/><br/>
    <h3 style={{fontWeight:"bold",fontStyle:"arial"}}>Are you signing up as?</h3>
  
  <div className="Buttons">
    <Button  className="Student" onClick={gotoStudentRegister} >Student</Button><br/>
    <Button  className="Lecturer" >Lecturer</Button><br/>
    <Button  className="Register" >Registrar</Button>
  </div>
    <p>Already have an account?Login</p>
  </div>
  )

 }
 export default Register