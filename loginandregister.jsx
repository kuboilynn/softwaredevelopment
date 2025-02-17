import makereImage from "./makerere_university.jpg"
import { useNavigate} from "react-router-dom";




function LoginAndRegister(){
  const navigate=useNavigate();
  function Loginpage(){
    navigate("/login")

    

  }

  function Registerpage(){
    navigate("/register")

  }


  return(
    <div>
      <h2>
        Academic issue Tracker
      </h2>
      <img src={makereImage} alt="makerere symbol"></img>
      <button className="login" onClick={Loginpage}>Login</button><br/>
      <button className="Register" onClick={Registerpage}>Register</button>
    </div>
  )
}

export default LoginAndRegister