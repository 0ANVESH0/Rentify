import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './MyAdds.css'; // Assuming you have a CSS file for styling

function MyAdds() {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/my-properties/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const deleteProperty = async (propertyId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this property?');
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8000/delete-property/${propertyId}/`);
            if (response.status === 204) {
                // Property deleted successfully, refresh properties list
                fetchProperties();
            } else {
                console.error('Failed to delete property:', response.data);
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    return (
        <div>
            <h2 style={{ color: 'white' }}>My Adds</h2>
            <div className="my-adds-container">
                <ul className="properties-list">
                    {properties.map(property => (
                        <li key={property.PropertyId} className="property-item">
                            <div className="property-actions">
                                <button 
                                    onClick={() => navigate(`/update-property/${property.PropertyId}`)} 
                                    className="action-link"
                                >
                                    UPDATE
                                </button>
                                <button 
                                    onClick={() => deleteProperty(property.PropertyId)} 
                                    className="delete-button"
                                >
                                    DELETE
                                </button>
                            </div>
                            <div className="property-details">
                                <p><strong>Address Line 1:</strong> {property.AddressLine1}</p>
                                <p><strong>Address Line 2:</strong> {property.AddressLine2}</p>
                                <p><strong>City:</strong> {property.City}</p>
                                <p><strong>Pin:</strong> {property.Pin}</p>
                                <p><strong>State:</strong> {property.State}</p>
                                <p><strong>Country:</strong> {property.Country}</p>
                                <p><strong>Area (sq ft):</strong> {property.AreaInSqFt}</p>
                                <p><strong>BHK:</strong> {property.BHK}</p>
                                <p><strong>Bathrooms:</strong> {property.Bathrooms}</p>
                                <p><strong>Rent:</strong> {property.Rent}</p>
                                <p><strong>Deposit:</strong> {property.Deposit}</p>
                                <p><strong>Floor:</strong> {property.Floor}</p>
                                <p><strong>Property Type:</strong> {property.PropertyType}</p>
                                <p><strong>Brokerage:</strong> {property.Brokerage}</p>
                                <p><strong>Maintenance Charge:</strong> {property.MaintenanceCharge}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MyAdds;
