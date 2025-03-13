import React from "react";
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import IssueCard from './IssueCard.jsx';
import '../pages/styles/Dashboard.css';



const Dashboard =()=>{
    return(
        <div className="dashboard-container">
            <SideBar/>
            <div className="main-content">
                <Header/>
                <div className="dashboard">
                    <IssueCard/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;