// MyAdds.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyAdds() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            // Fetch properties posted by the logged-in user
            const response = await axios.get('http://localhost:8000/my-properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    return (
        <div>
            <h2>My Adds</h2>
            <ul>
                {properties.map(property => (
                    <li key={property.id}>
                        <Link to={`/update-property/${property.id}`}>Update</Link>
                        <Link to={`/delete-property/${property.id}`}>Delete</Link>
                        {/* Display property details */}
                        <p>{property.address}</p>
                        {/* Other property details */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyAdds;
