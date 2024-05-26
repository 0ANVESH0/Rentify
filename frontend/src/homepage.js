import React from 'react';
import logo from './rentify_logo.png'; // Import the logo image
import HouseImage from './HouseImage.png'; // Import the second image
import './homepage.css';

function Homepage() {
    return (
        <header style={{ position: 'relative', height: '100vh', marginTop: '20px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {/* Use the imported second image covering the entire page */}
            <img src={HouseImage} alt="Second Image" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* Use the imported logo, smaller in size and centered */}
            <img src={logo} alt="Logo" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '20%', maxHeight: '50%', zIndex: '1', backgroundColor: 'transparent' }} />
            {/* Add the heading */}
            <h1 className="animated-heading" style={{ position: 'absolute', top: 'calc(50% + 50px)', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '2', color: 'black', textAlign: 'center', fontFamily: 'Georgia, serif', marginTop:"100px"}}> Find your Most Suitable Property</h1>
         
         </div>
        </header>
    );
}

export default Homepage;
