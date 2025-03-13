import React from "react";
import '../pages/styles/Header.css';

const Header =()=>{
    return (
        <header className="header">
            <div className="header-content">
                <h1>Lecturer</h1>
                <div className="header-actions">
                    <button className="Logout-button">Logout</button>
                </div>
            </div>

        </header>
    )
}
export default Header;