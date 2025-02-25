import Img from "../UI/Img"
import makerere from "../assets/makerere_university.jpg"
import Button from "../UI/Button"
import Div from "../UI/pages"


 
 function Register(){
  

  return(<Div>
    
    <Img src={makerere} alt="makerere logo"/><br/>
    <h3 style={{fontWeight:"bold",fontStyle:"arial"}}>Are you signing up as?</h3>
    <Button  className="Register" >Student</Button><br/>
    <Button  className="Register" >Lecturer</Button><br/>
    <Button  className="Register" >Registrar</Button><br/>
  </Div>)

 }
 export default Register