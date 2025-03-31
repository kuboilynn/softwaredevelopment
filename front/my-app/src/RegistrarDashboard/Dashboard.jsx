
import '../pages/styles/Dashboard.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import {FaFlag,FaUser,FaBars,FaHome,FaEnvelope} from "react-icons/fa"

import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"



function DashboardRegistrar(){

  const[dashboard,setdashboard]=useState(false)
  const showdashboard =()=> setdashboard(!dashboard)
  const navigate=useNavigate()
  const gotoLoginandRegister=()=>navigate("/RegisterandLogin")
  return(
    <>
    <div className="dashhead">
      <Link to="#">
          <FaBars onClick={showdashboard}/>
      </Link>
     <Link>
     <FaSignOutAlt onclick={gotoLoginandRegister}/>
     </Link>
      
    </div>
    
    <nav className={dashboard? 'active-dashboard':'closed-dashboard'}>
      
      <ul className="items">
        <li>
          <Link to="/RegistrarDashboard/Home">
            <FaHome/>Home
          </Link>
        </li>
        <li>
          <Link to="/RegistrarDashboard/Issues">
            <FaFlag/> Issues
          </Link>
        </li>
        <li>
          <Link to="/RegistrarDashboard/Profile">
            <FaUser/> Profile
          </Link>
        </li>
        <li>
          <Link to="/RegistrarDashboard/RegistrarContact">
            <FaEnvelope/> Contact
          </Link>
        </li>
      </ul>
    </nav>
   </> 
  )
}

export default DashboardRegistrar