import React, { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import '../pages/styles/LecRegProfile.css';

const RegProfile = () => {
  const { lecturerIssues } = useOutletContext(); // Optional: Access issues if needed later
  const [isEditing, setIsEditing] = useState(false); // Start in view mode
  const [profile, setProfile] = useState({
    name: '',
    id: '',
    email: '',
    office: '', // Added office to initial state
    profilePicture: ''
  });
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/registrar-profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setStatusMessage("Failed to load profile.");
      }
    };
    fetchProfile();
  }, []);

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
      if (profile.name && profile.id && profile.email) {
        try {
          const response = await fetch('http://localhost:3001/api/registrar-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
          });
          if (!response.ok) throw new Error('Failed to save profile');
          setIsEditing(false);
          setStatusMessage("Profile saved successfully!");
        } catch (error) {
          console.error('Error saving profile:', error);
          setStatusMessage("Failed to save profile. Please try again.");
        }
      } else {
        alert('Please fill in all required fields (Name, ID, and Email) before saving.');
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
          <label className="field-label">Office:</label>
          {isEditing ? (
            <input
              type="text"
              name="office"
              value={profile.office}
              onChange={handleInputChange}
              className="field-input"
              placeholder="Enter your office location"
            />
          ) : (
            <p className="field-value">{profile.office || 'Not set'}</p>
          )}
        </div>
        <button
          onClick={toggleEdit}
          className={`edit-button ${isEditing ? 'save' : 'edit'}`}
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </div>
    </div>
  );
};

export default RegProfile;