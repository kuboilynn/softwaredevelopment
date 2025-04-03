import { FaBars } from "react-icons/fa"
import { FaHome } from "react-icons/fa"
import './styles/Dashboard.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { FaBell } from 'react-icons/fa';
import { getFromLocalStorage } from "../utils/EncryptDecrypt";
import useApiRequest from "../utils/useApiRequest";
import { useNavigate } from "react-router-dom";
import { domain } from "../utils/domain";


function DashboardStudent() {
  const navigate = useNavigate()
  const { postRequest, loading } = useApiRequest()
  const [dashboard, setdashboard] = useState(false)
  const showdashboard = () => setdashboard(!dashboard)

  const handleLogout = async () => {
    console.log(getFromLocalStorage("authInfo"))
    const response = await postRequest(`${domain}/accounts/logout`, { "refresh": getFromLocalStorage("authInfo").refreshToken });
    console.log(response);
    if (response.status === 205) {
      localStorage.removeItem("authInfo")
      localStorage.removeItem("isLoggedIn")
      navigate('/login');
    } else {
      console.log("Logout failed");
    }
  }

  return (
    <>
      <div className="dashhead">
        <div className="bars">
          <Link to="#">
            <FaBars onClick={showdashboard} />
          </Link>
        </div>

        <div className="bell">
          <Link to="/studentMessages">
            <FaBell />
          </Link>
        </div>

      </div>
      <nav className={dashboard ? 'active-dashboard' : 'closed-dashboard'}>

        <ul className="items">

          <li>
            <Link to="/StudentHome">
              <FaHome />Home
            </Link>
          </li>
          <li>
            <Link to="/FileIssue">
              <FaFileAlt /> File Issue
            </Link>
          </li>
          <li>
            <Link to="/Profile">
              <FaUser /> Profile
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>
              <FaSignOutAlt style={{ color: "red" }} /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default DashboardStudent