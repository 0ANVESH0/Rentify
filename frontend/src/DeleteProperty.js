// DeleteProperty.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeleteProperty() {
    const { id } = useParams(); // Get the property ID from the URL
    const [property, setProperty] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProperty();
    }, []);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/properties/${id}`);
            setProperty(response.data);
        } catch (error) {
            setError('Error fetching property details');
            console.error('Error fetching property details:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/properties/${id}`);
            setSuccessMessage('Property deleted successfully');
        } catch (error) {
            setError('Error deleting property');
            console.error('Error deleting property:', error);
        }
    };

    return (
        <div>
            <h2>Delete Property</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <p>Are you sure you want to delete the property "{property.AddressLine1}"?</p>
            <button onClick={handleDelete}>Delete Property</button>
        </div>
    );
}

export default DeleteProperty;
