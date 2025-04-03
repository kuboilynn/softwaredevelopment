import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import '../pages/styles/LecRegProfile.css';

const LecProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // Start in view mode
  const [profile, setProfile] = useState({
    name: '',
    id: '',
    email: '',
    program: '',
    profilePicture: ''
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lecturer-profile', {
          headers: { 'Content-Type': 'application/json' },
          // Add authentication header if needed, e.g., Authorization: Bearer <token>
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
=======
import useApiRequest from "../utils/useApiRequest";
import { domain } from "../utils/domain";
import { Edit, Save, Upload } from "lucide-react";
import '../pages/styles/LecRegProfile.css';

const LecProfile = () => {
  const { getRequest, putRequest } = useApiRequest();
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const req = await getRequest(`${domain}/accounts/profile`);
      if (req.status === 200) {
        setUserProfile(req.body);
        setFormData({
          username: req.body.user.username,
          first_name: req.body.user.first_name,
          last_name: req.body.user.last_name,
          email: req.body.user.email,
          id_number: req.body.id_number,
          role: req.body.role,
          department: req.body.department,
          gender: req.body.gender,
          image: req.body.image || "",
        });
        setImagePreview(`${domain}${req.body.image}`);
      } else {
        setMessage({ type: "error", text: "Error fetching profile" });
>>>>>>> Lynn
      }
    };
    fetchProfile();
  }, []);
<<<<<<< HEAD

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, profilePicture: imageUrl }));
    }
  };

  const toggleEdit = async () => {
    if (isEditing) {
      if (!profile.name || !profile.id || !profile.email) {
        alert('Please fill in all required fields (Name, ID, and Email) before saving.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/lecturer-profile', {
          method: 'PUT', // Use PUT or PATCH depending on your backend
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
          // Add authentication header if needed
        });
        if (!response.ok) throw new Error('Failed to save profile');
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-container">
          <img
            src={profile.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-image"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload"
            />
          )}
        </div>
        <div className="profile-field">
          <label className="field-label">Name:*</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="field-input"
              placeholder="Enter your name"
              required
            />
          ) : (
            <p className="field-value">{profile.name || 'Not set'}</p>
          )}
        </div>
        <div className="profile-field">
          <label className="field-label">ID:*</label>
          {isEditing ? (
            <input
              type="text"
              name="id"
              value={profile.id}
              onChange={handleInputChange}
              className="field-input"
              placeholder="Enter your ID"
              required
            />
          ) : (
            <p className="field-value">{profile.id || 'Not set'}</p>
          )}
        </div>
        <div className="profile-field">
          <label className="field-label">Email:*</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="field-input"
              placeholder="Enter your email"
              required
            />
          ) : (
            <p className="field-value">{profile.email || 'Not set'}</p>
          )}
        </div>
        <div className="profile-field">
          <label className="field-label">Program:</label>
          {isEditing ? (
            <input
              type="text"
              name="program"
              value={profile.program}
              onChange={handleInputChange}
              className="field-input"
              placeholder="Enter your program"
            />
          ) : (
            <p className="field-value">{profile.program || 'Not set'}</p>
          )}
        </div>
        <button
          onClick={toggleEdit}
          className={`edit-button ${isEditing ? 'save' : 'edit'}`}
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
      </div>
    </div>
=======

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setMessage({ type: "error", text: "Invalid image file" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && (value === "" || !(value instanceof File))) return;
      dataToSend.append(key, value);
    });

    const res = await putRequest(`${domain}/accounts/profile`, dataToSend, true);
    if (res.status === 200) {
      setMessage({ type: "success", text: "Profile updated successfully" });
      setIsEditing(false);
    } else {
      setMessage({ type: "error", text: "Failed to update profile" });
    }
  };

  return (
    <>
      <div className="lec-profile-container">

        <div className="lec-profile-header">
          <h3>User Profile - {formData && formData.username}</h3>
          {!isEditing && (
            <button className="lec-edit-btn" onClick={() => setIsEditing(true)}>
              <Edit size={16} /> Edit Profile
            </button>
          )}
        </div>

        {message.text && (
          <div className={`lec-form-message ${message.type}`}>{message.text}</div>
        )}

        {userProfile ? (
          <form onSubmit={handleSubmit} className="lec-profile-form">
            <div className="lec-profile-picture">
              <img
                src={imagePreview || "/vite.svg"}
                alt="Profile"
                className="lec-profile-image"
              />
              {isEditing && (
                <label className="lec-upload-label">
                  <Upload size={16} />
                  <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                </label>
              )}
            </div>

            <div className="lec-form-grid">
              {[
                ["Username", "username"],
                ["Email", "email"],
                ["First Name", "first_name"],
                ["Last Name", "last_name"],
                ["Id Number", "id_number"],
                ["Department", "department"],
              ].map(([label, name]) => (
                <div className="lec-form-group" key={name}>
                  <label>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              ))}

              <div className="lec-form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="lec-form-group" style={{display:"none"}}>
                <label>User Type</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="Student">Student</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Registrar">Registrar</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <button type="submit" className="lec-save-btn">
                <Save size={16} /> Save Changes
              </button>
            )}
          </form>
        ) : (
          <p className="lec-loading">Loading user profile...</p>
        )}
      </div>
    </>

>>>>>>> Lynn
  );
};

export default LecProfile;