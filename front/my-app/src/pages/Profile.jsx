import React, { useState, useEffect } from "react";
import useApiRequest from "../utils/useApiRequest";
import { domain } from "../utils/domain";
import { Edit, Save, Upload } from "lucide-react";
import DashboardStudent from "./DashboardStudent";
import "./styles/Profile.css";

const Profile = () => {
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
      }
    };
    fetchProfile();
  }, []);

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
      <DashboardStudent />
      <div className="profile-container">

        <div className="profile-header">
          <h3>User Profile - {formData && formData.username}</h3>
          {!isEditing && (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <Edit size={16} /> Edit Profile
            </button>
          )}
        </div>

        {message.text && (
          <div className={`form-message ${message.type}`}>{message.text}</div>
        )}

        {userProfile ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-picture">
              <img
                src={imagePreview || "/vite.svg"}
                alt="Profile"
                className="profile-image"
              />
              {isEditing && (
                <label className="upload-label">
                  <Upload size={16} />
                  <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                </label>
              )}
            </div>

            <div className="form-grid">
              {[
                ["Username", "username"],
                ["Email", "email"],
                ["First Name", "first_name"],
                ["Last Name", "last_name"],
                ["Id Number", "id_number"],
                ["Department", "department"],
              ].map(([label, name]) => (
                <div className="form-group" key={name}>
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

              <div className="divided">
                <div className="form-group">
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
                <div className="form-group">
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
            </div>

            {isEditing && (
              <button type="submit" className="save-btn">
                <Save size={16} /> Save Changes
              </button>
            )}
          </form>
        ) : (
          <p className="loading">Loading user profile...</p>
        )}
      </div>
    </>

  );
};

export default Profile;