// UpdateProperty.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateProperty() {
    const { id } = useParams(); // Get the property ID from the URL
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProperty();
    }, []);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/properties/${id}`);
            setFormData(response.data);
        } catch (error) {
            setError('Error fetching property details');
            console.error('Error fetching property details:', error);
        }
    };

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

        try {
            const response = await axios.put(`http://localhost:8000/properties/${id}`, formData);
            setSuccessMessage('Property updated successfully');
        } catch (error) {
            setError('Error updating property');
            console.error('Error updating property:', error);
        }
    };

    return (
        <div>
            <h2>Update Property</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                {/* Input fields to update property details */}
                {/* Example: */}
                 <input type="text" name="AddressLine1" value={formData.AddressLine1} onChange={handleChange} />
                {/* Add other input fields based on your property data structure */}
                <button type="submit">Update Property</button>
            </form>
        </div>
    );
}

export default UpdateProperty;
