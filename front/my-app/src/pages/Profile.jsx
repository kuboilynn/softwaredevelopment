import DashboardStudent from "./DashboardStudent"
import './styles/student.css';
import Button from "../UI/Button";
import Input from "../UI/input";
import ProfilePic from "../UI/profile"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Profile(){
  const navigate = useNavigate();
    
    function GotoLogin() {
      navigate("/PasswordCorrect");
    }


  const defaultimage="https://via.placeholder.com/150"
  const [profileimage,setprofileimage]= useState(defaultimage);

    const handleimage=(e)=>{
      const file =e.target.files[0];
      if(file){
        const imageUrl=URL.createObjectURL(file);
        setprofileimage(imageUrl);
      }
    }
  
  
 
  return(<div>
          <DashboardStudent/>
          <div className="content">
            <div className="content-profile">
            <p>Profile</p>
            <ProfilePic src={profileimage} alt="profile picture"/>
           <input type="file"
           accept="image/*"
           onChange={handleimage}
           style={{objectFit:"cover"}}></input>
       
           <label>Name</label>
            <Input placeholder="Name"></Input>
            <label>Registration number</label>
            <Input placeholder="reg no"></Input>
            <label>Student Number</label>
            <Input placeholder="123"></Input>
            <label>Email</label>
            <Input placeholder="123@gmail.com"></Input>
            <Button onClick={GotoLogin}>Edit </Button>
            </div>
           
          </div>
  </div>)
}
export default Profile