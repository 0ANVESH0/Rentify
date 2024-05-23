import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file

function Register() {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        email: '',
        PhoneNumber: '',
        password: '',
        reenterPassword: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (formData.password !== formData.reenterPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register/', formData);
            if (response.status === 201) {
                setSuccessMessage('User registered successfully');
                setFormData({
                    FirstName: '',
                    LastName: '',
                    email: '',
                    PhoneNumber: '',
                    password: '',
                    reenterPassword: ''
                }); // Clear form fields after successful registration
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred while processing your request.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-heading">Register User</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <input className="register-input" type="text" name="FirstName" placeholder="First Name" value={formData.FirstName} onChange={handleChange} required />
                <input className="register-input" type="text" name="LastName" placeholder="Last Name" value={formData.LastName} onChange={handleChange} required />
                <input className="register-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input className="register-input" type="tel" name="PhoneNumber" placeholder="Phone Number" value={formData.PhoneNumber} onChange={handleChange} required />
                <input className="register-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input className="register-input" type="password" name="reenterPassword" placeholder="Re-enter Password" value={formData.reenterPassword} onChange={handleChange} required />
                <button className="register-button" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
