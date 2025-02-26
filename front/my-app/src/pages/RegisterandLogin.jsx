import { useNavigate } from "react-router-dom"
import makerere from "../assets/makerere_university.jpg"
import Button from "../UI/Button"
import Img from "../UI/Img"
import H1 from "../UI/h1"

function RegisterandLogin(){

  const navigate=useNavigate()
  function GotoLogin(){
    navigate("/Login")

  }

  function GotoRegister(){
    navigate("/Register")

  }

  return (
    <div >
      <title>AITS</title>
      <H1 >Academic Issue Tracking System</H1><br/>
      <Img src={makerere} alt="makerere logo"/><br/>
      <Button className="login" onClick={GotoLogin}>Login</Button>
      <Button  className="Register" onClick={GotoRegister}>Register</Button>
    </div>
  )

}

export default RegisterandLogin