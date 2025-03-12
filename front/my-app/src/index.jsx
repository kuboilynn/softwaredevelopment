import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentRegister from './pages/studentpages/StudentRegister';
import StudentHome from './pages/studentpages/StudentHome';


const root =ReactDOM.createRoot(document.getElementById('root'));root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/StudentRegister" element={<StudentRegister/>}/>
      <Route path="/StudentHome" element={<StudentHome/>}/>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

