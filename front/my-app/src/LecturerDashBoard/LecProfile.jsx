import React, { useState, useEffect } from "react";
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
  );
};

export default LecProfile;