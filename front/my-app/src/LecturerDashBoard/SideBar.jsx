import React from "react";
import { Link } from "react-router-dom";
import '../pages/styles/SideBar.css'

const SideBar=()=>{
    return(
        <div className="SideBar">
            <ul>
                <li><Link to="/LecturerDashBoard/home">Home</Link></li>
                <li><Link to="/LecturerDashBoard/issues">Issues</Link></li>
                <li><Link to="/LecturerDashBoard/communication">Communication</Link></li>
                <li><Link to="/LecturerDashBoard/statscard">StatsCard</Link></li>
                
            </ul>

        </div>
    )
}
export default SideBar;