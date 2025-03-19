import React from "react";
import '../pages/styles/Header.css';

const Header =()=>{
    return (
        <header className="header">
            <div className="Lecturer">
            <h1>Lecturer</h1>
            </div>

            <div className="header-actions">
            <button className="Logout-button" >Logout</button>    
            </div>

        </header>
    )
}
export default Header;