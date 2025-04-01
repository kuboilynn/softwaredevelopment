import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../UI/input"; // Assuming Input is a custom component
import Button from "../UI/Button"; // Assuming Button is a custom component
import '../pages/styles/AllRegister.css';

function StudentRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setShowError(false); // Hide error when the name is changed
  };

  const gotoStudentHome = () => {
    if (name === "") {
      setShowError(true); // Show error if the name is empty
    } else {
      setShowError(false); // Hide error if name is entered
      navigate("/StudentHome"); // Navigate to the student home page
    }
  };

  return (
    <>
      
      <h3 className="register-header">Register: Student</h3>
      <motion.p 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        style={{alignContent:"center"}}
        className="tagline"
      >
        Start Your Academic Journey,make problem solving easier
      </motion.p>
      {/* Student registration form */}
      <div className="student-form">
        <div className="Input-group">
          <Input 
            type="text" 
            value={name} 
            onChange={handleNameChange} 
            placeholder="Name"
            className="Input-field"
          />
          {showError && <span className="error">*Required</span>}
        </div>

        <div className="Input-group">
          <Input type="email" placeholder="Email" className="Input-field" />
        </div>

        <div className="Input-group">
          <Input type="text" placeholder="Reg No" className="Input-field" />
        </div>

        <div className="Input-group">
          <Input type="text" placeholder="Student No" className="Input-field" />
        </div>

        <div className="Input-group">
          <Input type="password" placeholder="Password" className="Input-field" />
        </div>

        <div className="Input-group">
          <Input type="password" placeholder="Confirm password" className="Input-field" />
        </div>

        <Button onClick={gotoStudentHome} className="signup-btn">
        <i className="fas fa-user-plus"></i>Signup
        </Button>
      </div>

      {/* Animated tagline */}
     
    </>
  );
}

export default StudentRegister;
