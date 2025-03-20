import Button from "../UI/Button"
import Input from "../UI/input";
import { useNavigate } from "react-router-dom";
import '../pages/styles/StudentRegister.css';

function StudentRegister(){
  const navigate=useNavigate()

  function gotoStudentHome(){
    navigate("./")

  }
  return(
    
      <div className="student-form">
      <h3>Register: Student</h3>
      <Input type="text" ></Input><br/>
      <Input type="text" ></Input><br/>
      <Input type="text" ></Input><br/>
      <Input type="text" ></Input><br/>
      <Input type="text" ></Input><br/>
      <Button onClick={gotoStudentHome}>Signup</Button>
    </div>
 
  )

}

export default StudentRegister