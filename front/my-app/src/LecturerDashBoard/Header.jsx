import React from "react";
import { useNavigate } from "react-router-dom";
import '../pages/styles/Header.css';

const Header =()=>{
    const navigate = useNavigate();
    const handleProfileClick = () =>{
        navigate('/LecturerDashboard/profile');
        console.log('Navigating to /LecturerDashboard/profile');
    };
    return (
        <header className="header">
            <div className="Lecturer">
            <h1>Lecturer</h1>
            </div>

            <button onClick={handleProfileClick} className="profile-button">Profile</button>

            <div className="header-actions">
            <button className="Logout-button" >Logout</button>    
            </div>

        </header>
    )
}
export default Header;