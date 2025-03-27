import {FaBars} from "react-icons/fa"
import {FaHome} from "react-icons/fa"
import '../pages/styles/Dashboard.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import {FaFlag} from "react-icons/fa"
import { FaUser } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";


function DashboardRegistrar(){

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
          <Link to="/Home">
            <FaHome/>Home
          </Link>
        </li>
        <li>
          <Link to="/Issues">
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
      </ul>
    </nav>
   </> 
  )
}

export default DashboardRegistrar