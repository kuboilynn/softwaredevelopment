import React, {useState} from "react";
import '../pages/styles/Profile.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(true);
    const [profile, setProfile] = useState({
        name: '',
        id: '',
        email: '',
        program: '',
        office: '',
        profilePicture: ''
    });
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setProfile(prev =>({...prev,[name]: value}));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile(prev => ({...prev, profilePicture: imageUrl}));
        }
    };

    const toggleEdit = () =>{
        if (isEditing && profile.name && profile.id && profile.email) {
            setIsEditing(!isEditing);
        }else if (isEditing){
            alert('Please fill in all required fields (Name, ID, and Email) before saving.');
        }else{
            setIsEditing(!isEditing);
        }
    };

    return(
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-image-container">
                    <img src={profile.profilePicture || 'https://via.placeholder.com/150'} // Placeholder if no image 
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
                    {isEditing ?(
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
                        <p className="field-value">{profile.name || 'Not set'} </p>
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
                    ):(
                        <p className="field-value">{profile.id || 'Not set'} </p>
                    )}
                </div>

                <div className="profile-field">
                    <label className="field-label">Email*</label>
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
                        <p className="field-value">{profile.email || 'Not set'} </p>
                    )}

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
                        ):(
                            <p className="field-value">{profile.program || 'Not set'} </p>
                            )}
                    </div>
                    <div className="profile-field">
                        <label className="field-label">Office:</label>
                        {isEditing ?(
                            <input
                            type="text"
                            name="office"
                            value={profile.office}
                            onChange={handleInputChange}
                            className="field-input"
                            placeholder="Enter your office location"
                            />
                        ):(
                            <p className="field-value">{profile.office || 'Not set'}</p>
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
        </div>
    );
};

export default Profile;