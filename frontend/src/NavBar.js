// NavBar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './NavBar.css';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); // Clear user context on logout
        localStorage.removeItem('user'); // Clear user data from local storage
        navigate('/login'); // Redirect to login page
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        console.log('Dropdown state:', !dropdownOpen); // Debugging: Check the state
    };

    const handleAddPropertyClick = (e) => {
        if (!user) {
            e.preventDefault(); // Prevent the default link behavior
            navigate('/login'); // Redirect to login page
        }
    };

    return (
        <nav className="navbar">
            <h1>Rentify</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Buy</Link></li>
                <li><Link to="/">Sell</Link></li>
                <li><Link to="/add-property" onClick={handleAddPropertyClick}>Add Property</Link></li>
                {user ? (
                    <li className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                        <span onClick={toggleDropdown} className="dropdown-toggle">
                            Hi, {user.firstname}!
                        </span>
                        <ul className="dropdown-menu">
                            <li><Link to="/profile">My Profile</Link></li>
                            <li><Link to="/my-adds">My Adds</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
