import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import Home from './Home.jsx';
import IssueCard from './IssueCard.jsx';
import Communication from './Communication.jsx';
import Profile from "./Profile.jsx";


const Dashboard = () => {
    return (
        <div className="Dashboard-main"> 
            <Header/>
            <div className="content">
                <SideBar/>
                <div className="dashboard-content">
                    <Routes>
                        <Route path="/home" element={<Home />}/> 
                        <Route path="/issues" element={<IssueCard />} />
                        <Route path="/communication" element={<Communication />}/>
                        <Route path="/profile" element={<Profile />}/>
                        <Route path="/" element={<div>Dashboard Home</div>}/>      
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


