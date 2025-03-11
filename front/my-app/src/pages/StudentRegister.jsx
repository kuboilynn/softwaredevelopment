import Button from "../UI/Button"
import Input from "../UI/input";
import { useNavigate } from "react-router-dom";

function StudentRegister(){
  const navigate=useNavigate()

  function gotoStudentHome(){
    navigate("./")

  }
  return(
    <div>
      <h3>Register: Student</h3>
      <Input type="text" placeholder="Name"></Input><br/>
      <Input type="text" placeholder="email"></Input><br/>
      <Input type="text" placeholder="Registration Number"></Input><br/>
      <Input type="text" placeholder="Student number" ></Input><br/>
      <Input type="text" placeholder="password"></Input><br/>
      <Input type="text" placeholder="confirm password"></Input><br/>
      <Button onClick={gotoStudentHome}>Signup</Button>
    </div>
  )

}

export default StudentRegister