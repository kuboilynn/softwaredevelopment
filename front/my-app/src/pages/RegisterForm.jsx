import { useState } from "react";
import { motion } from "framer-motion";
<<<<<<< HEAD
import { registerUser } from "../api/authApi";  // Import the registerUser function

function RegisterForm() {
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
=======
import Input from "../UI/input";
import '../pages/styles/AllRegister.css';
import useApiRequest from "../utils/useApiRequest.js";
import { domain } from "../utils/domain.js";

function RegisterForm() {
  const { postRequest, loading } = useApiRequest()
  const [step, setStep] = useState(1);
  const initial = {
>>>>>>> Lynn
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
<<<<<<< HEAD
    idNo: "",
    userType: "",
    gender: ""
  });
=======
    id_number: "",
    role: "",
    gender: "",
    department: "",
    session: ""
  }
  const [formData, setFormData] = useState(initial);

  const [showErrors, setShowErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const requiredFields = {
    1: ['username', 'first_name', 'last_name', 'email', 'gender'],
    2: ['id_number', 'role', 'department', 'session', 'password', 'confirmPassword']
  };
>>>>>>> Lynn

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData(prev => {
      const updatedForm = {
        ...prev,
        [name]: value
      };

      // Clear session if role is changed to anything other than "Student"
      if (name === "role" && value !== "Student") {
        updatedForm.session = "";
      }

      return updatedForm;
    });

    setShowErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

<<<<<<< HEAD
  const handleSubmit = async () => {
    const errors = {};
    const requiredFields = ['username', 'firstName', 'lastName', 'email', 'password', 'idNo', 'userType', 'gender'];

    requiredFields.forEach(field => {
=======

  const validateStep = () => {
    const errors = {};
    requiredFields[step].forEach(field => {
      // Only check session if role is Student
      if (field === 'session' && formData.role !== 'Student') return;
>>>>>>> Lynn
      if (!formData[field]) {
        errors[field] = true;
      }
    });

    if (step === 2 && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = true;
    }

    setShowErrors(errors);
    return Object.keys(errors).length === 0;
  };

<<<<<<< HEAD
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
=======
  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setServerError("");
    setSuccessMessage("");

    const req = await postRequest(`${domain}/accounts/register`, formData)

    console.log(req)

    if (req.status === 400 && req.details) {
      setServerError(req.details.error);
    }
    else if (req.status === 400 && req.details?.errors) {
      req.details.errors.forEach((error) => {
        setServerError(error.msg);
      });
    } else if (req.status === 500) {
      setServerError(req.details.error);
    }
    else if (req.body.message) {
      setSuccessMessage(req.body.message);
      setFormData(initial)
>>>>>>> Lynn
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="register-page">
      <div className="register-form">
        <h3><i className="fas fa-user-graduate"></i> Register</h3>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="tagline"
>>>>>>> Lynn
        >
          Create Your Academic Profile
        </motion.p>

        {serverError && <div className="error-message" style={{ padding: "10px 0" }}>{serverError}</div>}
        {successMessage && <div className="success" style={{ padding: "10px 0" }}>{successMessage}</div>}

        {step === 1 && (
          <>
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
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="Input-field"
              />
              {showErrors.first_name && <span className="error">*Required</span>}
            </div>

<<<<<<< HEAD
      <button 
        className="signup-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Registering...' : <><i className="fas fa-user-plus"></i> Sign Up</>}
      </button>
=======
            <div className="Input-group">
              <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="Input-field"
              />
              {showErrors.last_name && <span className="error">*Required</span>}
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

            <button className="signup-btn" onClick={handleNext}>
              Next <i className="fas fa-arrow-right"></i>
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="Input-group">
              <Input
                type="text"
                name="id_number"
                value={formData.id_number}
                onChange={handleInputChange}
                placeholder="ID Number"
                className="Input-field"
              />
              {showErrors.id_number && <span className="error">*Required</span>}
            </div>

            <div className="Input-group">
              <Input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Department"
                className="Input-field"
              />
              {showErrors.department && <span className="error">*Required</span>}
            </div>

            <div className="divided">
              <div className="Input-group">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="Input-field"
                >
                  <option value="">Select User Type</option>
                  <option value="Student">Student</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Registrar">Registrar</option>
                </select>
                {showErrors.role && <span className="error">*Required</span>}
              </div>
              {formData.role === "Student" && (
                <div className="Input-group">
                  <select
                    name="session"
                    value={formData.session}
                    onChange={handleInputChange}
                    className="Input-field"
                  >
                    <option value="">Select Session</option>
                    <option value="Day">Day</option>
                    <option value="Evening">Evening</option>
                  </select>
                  {showErrors.session && <span className="error">*Required</span>}
                </div>
              )}
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
              {showErrors.confirmPassword && (
                <span className="error">
                  {formData.password !== formData.confirmPassword
                    ? "Passwords do not match"
                    : "*Required"}
                </span>
              )}
            </div>

            <div className="step-buttons">
              <button className="signup-btn" onClick={handleBack}>
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <button className="signup-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Signing Up...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i> Sign Up
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
>>>>>>> Lynn
    </div>
  );
}

export default RegisterForm;
