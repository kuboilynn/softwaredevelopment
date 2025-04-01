import DashboardRegistrar from './Dashboard';
import Button from "../UI/Button"
import Input from '../UI/input';
import '../pages/styles/student.css';

function RegistrarProfile(){
  return(
    <div>
      <DashboardRegistrar></DashboardRegistrar>
      <div className="content">
           <p>Profile</p>
           
           
           <label>Name</label>
            <Input placeholder="Name"></Input>
            <label>Registration number</label>
            <Input placeholder="reg no"></Input>
            <label>Student Number</label>
            <Input placeholder="123"></Input>
            <label>Email</label>
            <Input placeholder="123@gmail.com"></Input>
            <Button >Edit </Button>
          </div>
  </div>)
 
  
}

export default RegistrarProfile