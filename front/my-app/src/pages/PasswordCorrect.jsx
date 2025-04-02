import Input from "../UI/input";
import './styles/Login.css';
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

function PasswordCorrect(){

  const navigate = useNavigate();
   
   function GotoLogin() {
     navigate("/Login");
   }

return(<div className="newpassword">
  <label>new password</label>
  <Input></Input>
  <label> comfirm new password</label>
  <Input></Input>
  <Button  onClick={GotoLogin}>Reset </Button>

</div>)
}
export default PasswordCorrect