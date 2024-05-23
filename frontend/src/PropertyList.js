import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './PropertyList.css';

function PropertyList() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [error, setError] = useState(null);
    const [sellerDetails, setSellerDetails] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-all-properties/');
            setProperties(response.data);
            setFilteredProperties(response.data);
        } catch (error) {
            setError('Error fetching properties');
            console.error('Error fetching properties:', error);
        }
    };

    const handleSearch = () => {
        const filtered = properties.filter(property => {
            const searchableFields = Object.values(property).join('').toLowerCase();
            return searchableFields.includes(searchKeyword.toLowerCase());
        });
        setFilteredProperties(filtered);
    };

    const handleInterested = async (propertyId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/properties/${propertyId}/seller/`);
            setSellerDetails(response.data);
            console.log('Seller details fetched successfully:', response.data);
        } catch (error) {
            setError('Error fetching seller details');
            console.error('Error fetching seller details:', error);
        }
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    className='search-input'
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Enter keyword to search"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <div className="property-list-container">
                <h2>Available Rental Properties</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="properties">
                    {filteredProperties.map(property => (
                        <div key={property.PropertyId} className="property-card">
                            <h3>{property.AddressLine1}, {property.City}</h3>
                            <p>Address Line 2: {property.AddressLine2}</p>
                            <p>City: {property.City}</p>
                            <p>Pin: {property.Pin}</p>
                            <p>State: {property.State}</p>
                            <p>Country: {property.Country}</p>
                            <p>Area: {property.AreaInSqFt} sq ft</p>
                            <p>BHK: {property.BHK}</p>
                            <p>Bathrooms: {property.Bathrooms}</p>
                            <p>Rent: {property.Rent}</p>
                            <p>Brokerage: {property.Brokerage}</p>
                            <p>Maintenance Charge: {property.MaintenanceCharge}</p>
                            <p>Deposit: {property.Deposit}</p>
                            <p>Floor: {property.Floor}</p>
                            <p>Property Type: {property.PropertyType}</p>
                            <button onClick={() => handleInterested(property.PropertyId)}>I'm Interested</button>
                        </div>
                    ))}
                </div>
                {sellerDetails && (
                    <div className="seller-details">
                        <h3>Seller Details</h3>
                        <p>Name: {sellerDetails.name}</p>
                        <p>Phone: {sellerDetails.phone}</p>
                        <p>Email: {sellerDetails.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertyList;
