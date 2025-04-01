import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentRegister from './pages/StudentRegister';

import LecDashboard from './LecturerDashBoard/LecDashboard.jsx';
import LecHome from './LecturerDashBoard/LecHome.jsx';
import LecIssueCard from './LecturerDashBoard/LecIssueCard.jsx';
import LecCommunication from './LecturerDashBoard/LecCommunication.jsx';
import LecProfile from './LecturerDashBoard/LecProfile.jsx';

import StudentHome from './pages/StudentHome';
import StudentIssues from './pages/StudentIssues';
import FileIssue from './pages/FileIssue';
import Profile from './pages/Profile';
import LecturerRegister from './pages/LecturerRegister.jsx';
import RegistrarRegister from './pages/RegistrarRegister.jsx';

import RegistrarDashboard from './RegistrarDashboard/RegistrarDashboard.jsx';
import RegHome from './RegistrarDashboard/RegHome.jsx';
import RegIssue from './RegistrarDashboard/RegIssue.jsx';
import RegFileIssue from './RegistrarDashboard/RegFileIssue.jsx';
import RegProfile from './RegistrarDashboard/RegProfile.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/StudentRegister" element={<StudentRegister />} />

        {/* Lecturer Dashboard */}
        <Route path="/LecturerDashBoard" element={<LecDashboard />}>
          <Route index element={<LecHome />} />
          <Route path="LecHome" element={<LecHome />} />
          <Route path="LecIssueCard" element={<LecIssueCard />} />
          <Route path="LecCommunication" element={<LecCommunication />} />
          <Route path="LecProfile" element={<LecProfile />} />
        </Route>

        <Route path="/RegistrarDashboard" element={<RegistrarDashboard />}>
          <Route index element={<RegHome />} /> 
          <Route path="RegHome" element={<RegHome />} />
          <Route path="RegIssue" element={<RegIssue />} />
          <Route path="RegFileIssue" element={<RegFileIssue />} />
          <Route path="RegProfile" element={<RegProfile />} />
        </Route>

        <Route path="/LecturerRegister" element={<LecturerRegister />} />
        <Route path="/RegistrarRegister" element={<RegistrarRegister />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/StudentIssues" element={<StudentIssues />} />
        <Route path="/FileIssue" element={<FileIssue />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);