import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../UI/input"; // Assuming Input is a custom component
import Button from "../UI/Button"; // Assuming Button is a custom component
import '../pages/styles/AllRegister.css';

function StudentRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setShowError(false); // Hide error when the name is changed
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const gotoStudentHome = () => {
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setShowError(true); // Show error if any field is empty
    } else if (password !== confirmPassword) {
      setShowError(true); // Show error if passwords don't match
    } else {
      setShowError(false); // Hide error if everything is valid
      navigate("/StudentHome"); // Navigate to the student home page
    }
  };

  return (
    <>
      <h3 className="register-header">Register: Student</h3>
      <motion.p 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="tagline"
      >
        Start Your Academic Journey, make problem solving easier
      </motion.p>

      {/* Student registration form */}
      <div className="student-form">
        <h3><i className="fas fa-user-graduate"></i> Register: Student</h3>
        <motion.p 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="tagline"
        >
          Start Your Academic Journey
        </motion.p>

        {/* Name */}
        <div className="Input-group">
          <Input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Username"
            className="Input-field"
          />
          {showError && !name && <span className="error">*Name is required</span>}
        </div>

        {/* Email */}
        <div className="Input-group">
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="Input-field"
          />
          {showError && !email && <span className="error">*Email is required</span>}
        </div>

        {/* Password */}
        <div className="Input-group">
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="Input-field"
          />
          {showError && !password && <span className="error">*Password is required</span>}
        </div>

        {/* Confirm Password */}
        <div className="Input-group">
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            className="Input-field"
          />
          {showError && password !== confirmPassword && <span className="error">*Passwords must match</span>}
        </div>

        <Button onClick={gotoStudentHome} className="signup-btn">
          <i className="fas fa-user-plus"></i> Signup
        </Button>
      </div>
    </>
  );
}

export default StudentRegister;

