import Input from "../UI/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../pages/styles/AllRegister.css';
import { motion } from "framer-motion";
import { registerUser } from "../api/authApi";  // Import the registerUser function

function RegisterForm() {
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    idNo: "",
    userType: "",
    gender: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setShowErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleSubmit = async () => {
    const errors = {};
    const requiredFields = ['username', 'firstName', 'lastName', 'email', 'password', 'idNo', 'userType', 'gender'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = true;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = true;
    }

    if (Object.keys(errors).length > 0) {
      setShowErrors(errors);
      return;
    }

    const registrationData = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      idNo: formData.idNo,
      userType: formData.userType,
      gender: formData.gender,
    };

    setLoading(true);

    try {
      const data = await registerUser(registrationData);  // Use the API call
      setLoading(false);
      if (data.success) {
        // Redirect based on user type
        switch (formData.userType) {
          case 'Student':
            navigate("/StudentHome");
            break;
          case 'Lecturer':
            navigate("/LecturerDashBoard/LecHome");
            break;
          case 'Registrar':
            navigate("/RegistrarDashboard/RegHome");
            break;
          default:
            console.error('Unknown user type');
        }
      } else {
        setServerError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setServerError(error.message);
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-form">
      <h3><i className="fas fa-user-graduate"></i>Register</h3>
      <motion.p 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="tagline"
      >
        Create Your Academic Profile
      </motion.p>

      {/* Display server error message */}
      {serverError && <div className="error-message">{serverError}</div>}

      {/* Form Fields */}
      <div className="Input-group">
        <Input 
          type="text" 
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="Input-field"
        />
        {showErrors.username && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <Input 
          type="text" 
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="Input-field"
        />
        {showErrors.firstName && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <Input 
          type="text" 
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="Input-field"
        />
        {showErrors.lastName && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <Input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="Input-field"
        />
        {showErrors.email && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <Input 
          type="text" 
          name="idNo"
          value={formData.idNo}
          onChange={handleInputChange}
          placeholder="ID Number"
          className="Input-field"
        />
        {showErrors.idNo && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <select
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
          className="Input-field"
        >
          <option value="">Select User Type</option>
          <option value="Student">Student</option>
          <option value="Lecturer">Lecturer</option>
          <option value="Registrar">Registrar</option>
        </select>
        {showErrors.userType && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="Input-field"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {showErrors.gender && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <Input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="Input-field"
        />
        {showErrors.password && <span className="error">*Required</span>}
      </div>

      <div className="Input-group">
        <Input 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="Input-field"
        />
        {showErrors.confirmPassword && <span className="error">*Passwords must match</span>}
      </div>

      <button 
        className="signup-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Registering...' : <><i className="fas fa-user-plus"></i> Sign Up</>}
      </button>
    </div>
  );
}

export default RegisterForm;
