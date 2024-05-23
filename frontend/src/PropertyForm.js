import React, { useState } from 'react';
import axios from 'axios';
import './PropertyForm.css'; // Import the CSS file

function PropertyForm() {
    const [formData, setFormData] = useState({
        PropertyId: '',
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
        PropertyType: '',
        seller: '' // Add seller field
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'seller' && value) {
            fetchSellerDetails(value);
        }
    };

    const fetchSellerDetails = async (sellerId) => {
        try {
            const response = await axios.get(`http://localhost:8000/sellers/${sellerId}/`);
            if (response.status === 200) {
                const { Brokerage, MaintenanceCharge } = response.data;
                setFormData(prevState => ({
                    ...prevState,
                    Brokerage,
                    MaintenanceCharge
                }));
            }
        } catch (error) {
            console.error('Error fetching seller details:', error);
            setError('Error fetching seller details.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/insert-property/', formData);
            if (response.status === 201) {
                setSuccessMessage('Property inserted successfully');
                setFormData({
                    PropertyId: '',
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
                    PropertyType: '',
                    seller: '' // Reset seller field
                });
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
        <div className="property-form-container">
            <h2 className="property-form-heading">Add Property</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="property-form" onSubmit={handleSubmit}>
                <input type="text" name="PropertyId" placeholder="Property ID" value={formData.PropertyId} onChange={handleChange} required />
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
                <input type="number" name="Deposit" placeholder="Deposit" value={formData.Deposit} onChange={handleChange} required />
                <input type="number" name="Floor" placeholder="Floor" value={formData.Floor} onChange={handleChange} required />
                <input type="text" name="PropertyType" placeholder="Property Type" value={formData.PropertyType} onChange={handleChange} required />
                {/* Input for seller field */}
                <input type="text" name="seller" placeholder="Seller ID" value={formData.seller} onChange={handleChange} required />
                <input type="number" name="Brokerage" placeholder="Brokerage" value={formData.Brokerage} onChange={handleChange} required />
                <input type="number" name="MaintenanceCharge" placeholder="Maintenance Charge" value={formData.MaintenanceCharge} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PropertyForm;
