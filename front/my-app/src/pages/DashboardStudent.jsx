import {FaBars} from "react-icons/fa"
import {FaHome} from "react-icons/fa"
import './styles/Dashboard.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import {FaFlag} from "react-icons/fa"
import { FaUser } from "react-icons/fa";
import { FaFileAlt,FaSignOutAlt } from "react-icons/fa";


function DashboardStudent(){

  const[dashboard,setdashboard]=useState(false)
  const showdashboard =()=> setdashboard(!dashboard)
  return(
    <>
    <div className="dashhead">
      <Link to="#">
          <FaBars onClick={showdashboard}/>
      </Link>
      
    </div>
    <nav className={dashboard? 'active-dashboard':'closed-dashboard'}>
      
      <ul className="items">
        <li>
          <Link to="/StudentHome">
            <FaHome/>Home
          </Link>
        </li>
        <li>
          <Link to="/StudentIssues">
            <FaFlag/>Issues
          </Link>
        </li>
        <li>
          <Link to="/FileIssue">
            <FaFileAlt/> File Issue
          </Link>
        </li>
        <li>
          <Link to="/Profile">
            <FaUser/> Profile
          </Link>
        </li>
        <li>
        <Link to="/RegisterandLogin">
     <FaSignOutAlt style={{color:"red"}} /> Logout
     </Link>
        </li>
      </ul>
    </nav>
   </> 
  )
}

export default DashboardStudent