import React from "react";
import '../pages/styles/SideBar.css'

const SideBar=()=>{
    return(
        <div className="SideBar">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/issues">Issuecard</a></li>
                <li><a href="/communications">Communications</a></li>
                <li><a href="/settings">Settings</a></li>
            </ul>

        </div>
    )
}
export default SideBar;