import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateProperty.css'; // Assuming you have a CSS file for styling

function UpdateProperty() {
    const { property_id } = useParams();
    const [formData, setFormData] = useState({
        AddressLine1: '',
        AddressLine2: '',
        City: '',
        Pin: '',
        State: '',
        Country: '',
        AreaInSqFt: '',
        BHK: '',
        Bathrooms: '',
        Rent: '',
        Brokerage: '',
        MaintenanceCharge: '',
        Deposit: '',
        Floor: '',
        PropertyType: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPropertyDetails();
    }, []);

    const fetchPropertyDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/properties/${property_id}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFormData(response.data);
        } catch (error) {
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
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/update-property/${property_id}/`, formData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            if (response.status === 200) {
                setSuccessMessage('Property updated successfully');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.detail || 'An error occurred while processing your request.');
            } else {
                setError('An error occurred while processing your request.');
            }
        }
    };

    return (
        <div className="update-property-container">
            <h2>Update Property</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="update-property-form" onSubmit={handleSubmit}>
                <input type="text" name="AddressLine1" placeholder="Address Line 1" value={formData.AddressLine1} onChange={handleChange} required />
                <input type="text" name="AddressLine2" placeholder="Address Line 2" value={formData.AddressLine2} onChange={handleChange} />
                <input type="text" name="City" placeholder="City" value={formData.City} onChange={handleChange} required />
                <input type="number" name="Pin" placeholder="Pin" value={formData.Pin} onChange={handleChange} required />
                <input type="text" name="State" placeholder="State" value={formData.State} onChange={handleChange} required />
                <input type="text" name="Country" placeholder="Country" value={formData.Country} onChange={handleChange} required />
                <input type="number" name="AreaInSqFt" placeholder="Area (sq ft)" value={formData.AreaInSqFt} onChange={handleChange} required />
                <input type="number" name="BHK" placeholder="BHK" value={formData.BHK} onChange={handleChange} required />
                <input type="number" name="Bathrooms" placeholder="Bathrooms" value={formData.Bathrooms} onChange={handleChange} required />
                <input type="number" name="Rent" placeholder="Rent" value={formData.Rent} onChange={handleChange} required />
                <input type="number" name="Brokerage" placeholder="Brokerage" value={formData.Brokerage} onChange={handleChange} required />
                <input type="number" name="MaintenanceCharge" placeholder="Maintenance Charge" value={formData.MaintenanceCharge} onChange={handleChange} required />
                <input type="number" name="Deposit" placeholder="Deposit" value={formData.Deposit} onChange={handleChange} required />
                <input type="number" name="Floor" placeholder="Floor" value={formData.Floor} onChange={handleChange} required />
                <input type="text" name="PropertyType" placeholder="Property Type" value={formData.PropertyType} onChange={handleChange} required />
                <button type="submit">Update Property</button>
            </form>
        </div>
    );
}

export default UpdateProperty;
