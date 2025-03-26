import DashboardStudent from "./DashboardStudent"
import './styles/StudentHome.css';
import Button from "../UI/Button";
import Input from "../UI/input";
import ProfilePic from "../UI/profile";
import stress from "../assets/stress.jpg"

function Profile(){

  function edit(){
    return(<div>
      <label>Name</label>
      <Input placeholder="Name"></Input>
      <label>Registration number</label>
    </div>

    )
  }
  return(<div>
          <DashboardStudent/>
          <div className="content">
           <p>Profile</p>
           <ProfilePic src={stress} alt="profile"/>
           <Button onClick={edit}>Edit Profile</Button>
           <label>Name</label>
            <Input placeholder="Name"></Input>
            <label>Registration number</label>
            <Input placeholder="reg no"></Input>
            <label>Student Number</label>
            <Input placeholder="123"></Input>
            <label>Email</label>
            <Input placeholder="123@gmail.com"></Input>
          </div>
  </div>)
}
export default Profile