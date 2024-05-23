import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-user-details/');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Welcome, {user.name}!</h2> {/* Render user's name */}
            <p>Email: {user.email}</p>
            {/* Add more user details here */}
        </div>
    );
};

export default User;
