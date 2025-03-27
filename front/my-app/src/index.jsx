import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentRegister from './pages/StudentRegister';

import Dashboard from './LecturerDashBoard/Dashboard.jsx';


import StudentHome from './pages/StudentHome';
import StudentIssues from './pages/StudentIssues';
import FileIssue from './pages/FileIssue';
import Profile from './pages/Profile';
import LecturerRegister from './pages/LecturerRegister.jsx';
import RegistrarRegister from './pages/RegistrarRegister.jsx';
import Home from './RegistrarDashboard/Home.jsx';



const root =ReactDOM.createRoot(document.getElementById('root'));root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/StudentRegister" element={<StudentRegister/>}/>
      <Route path="/RegistrarDashboard/Home" element={<Home/>}/>
      <Route path="/LecturerDashBoard/*" element={<Dashboard/>}/>
      <Route path="/LecturerRegister" element={<LecturerRegister/>}/>
      <Route path="/RegistrarRegister" element={<RegistrarRegister/>}/>
      <Route path="/StudentHome" element={<StudentHome/>}/>
      <Route path="/StudentIssues" element={<StudentIssues/>}/>
      <Route path="/FileIssue" element={<FileIssue/>}/>
      <Route path="/Profile" element={<Profile/>}/>

    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

