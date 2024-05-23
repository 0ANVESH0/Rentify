// Profile.js
import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p>No user data available.</p>;
    }

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-details">
                <p><strong>Full Name:</strong> {user.firstname} {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phone}</p>
            </div>
        </div>
    );
}

export default Profile;
