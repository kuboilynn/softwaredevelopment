import { useNavigate } from "react-router-dom"
import makerere from "../assets/makerere_university.jpg"
import Button from "../UI/Button"
import Img from "../UI/Img"
import Div from "../UI/pages"

function RegisterandLogin(){

  const navigate=useNavigate()
  function GotoLogin(){
    navigate("/Login")

  }

  function GotoRegister(){
    navigate("/Rgister")

  }

  return (
    <Div >
      <h1>Academic Issue Tracking System</h1><br/>
      <Img src={makerere} alt="makerere logo"/><br/>
      <Button className="login" onClick={GotoLogin}>Login</Button>
      <Button className="Register" onClick={GotoRegister}>Register</Button>
    </Div>
  )

}

export default RegisterandLogin