// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Login.css';

function Login() {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

        try {
            const response = await axios.post('http://localhost:8000/login/', formData);
            const userData = response.data;
            setUser({
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                phone: userData.phone
            });
            localStorage.setItem('user', JSON.stringify({
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                phone: userData.phone
            }));
            navigate('/');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred while processing your request.');
            }
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div>
                <h2 className="login-heading">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="login-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input className="login-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button className="login-button" type="submit">Login</button>
                </form>
                <h5 className='Register-Part'>New at Rentify? <button className="register-button" onClick={handleRegister}>Register here</button></h5>
            </div>
        </div>
    );
}

export default Login;
