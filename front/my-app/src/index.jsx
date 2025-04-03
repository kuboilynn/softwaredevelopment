import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterForm from './pages/RegisterForm'; 
import StudentHome from './pages/StudentHome';
import StudentMessages from './pages/studentMessages';
import FileIssue from './pages/FileIssue';
import Profile from './pages/Profile';
import LecDashboard from './LecturerDashBoard/LecDashboard.jsx';
import LecHome from './LecturerDashBoard/LecHome.jsx';
import LecIssueCard from './LecturerDashBoard/LecIssueCard.jsx';
import LecCommunication from './LecturerDashBoard/LecCommunication.jsx';
import LecProfile from './LecturerDashBoard/LecProfile.jsx';
import RegistrarDashboard from './RegistrarDashboard/RegistrarDashboard.jsx';
import RegHome from './RegistrarDashboard/RegHome.jsx';
import RegIssue from './RegistrarDashboard/RegIssue.jsx';
import RegFileIssue from './RegistrarDashboard/RegFileIssue.jsx';
import RegProfile from './RegistrarDashboard/RegProfile.jsx';
import RegisterandLogin from './pages/RegisterandLogin.jsx';
import PasswordCorrect from './pages/PasswordCorrect.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import PasswordResetForms from './pages/PasswordResetForm.jsx';
import ActivateAccount from './pages/ActivateAccount.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/Register" element={<RegisterForm/>}/>  
        <Route path="/Login" element={<Login/>}/>
        <Route path="/activate/:uid/:token" element={<ActivateAccount/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:slug/:token/" element={<PasswordResetForms />} />
        <Route path="/StudentHome" element={<StudentHome/>}/>
        <Route path="/studentMessages" element={<StudentMessages/>}/>
        <Route path="/FileIssue" element={<FileIssue/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/RegisterandLogin" element={<RegisterandLogin/>}/>
        <Route path='/PasswordCorrect' element={<PasswordCorrect/>}/>
        {/* Lecturer Dashboard */}
        <Route path="/LecturerDashBoard" element={<LecDashboard />}>
          <Route index element={<LecHome />} />
          <Route path="LecHome" element={<LecHome />} />
          <Route path="LecIssueCard" element={<LecIssueCard />} />
          <Route path="LecCommunication" element={<LecCommunication />} />
          <Route path="LecProfile" element={<LecProfile />} />
        </Route>

        {/* Registrar Dashboard */}
        <Route path="/RegistrarDashboard" element={<RegistrarDashboard />}>
          <Route index element={<RegHome />} />
          <Route path="RegHome" element={<RegHome />} />
          <Route path="RegIssue" element={<RegIssue />} />
          <Route path="RegFileIssue" element={<RegFileIssue />} />
          <Route path="RegProfile" element={<RegProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  //</React.StrictMode>
);