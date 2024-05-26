
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import UserProvider
import NavBar from './NavBar';
import Footer from './Footer';
import PropertyList from './PropertyList';
import Login from './Login';
import Register from './Register';
import PropertyForm from './PropertyForm';
import User from './User';
import Profile from './Profile'; 
import MyAdds from './MyAdds';
import UpdateProperty from './UpdateProperty';
import DeleteProperty from './DeleteProperty';
import Homepage from './homepage';


const HomepageWrapper = () => {
  return (
    <>
      <Homepage />
      <PropertyList />
    </>
  );
};


const RoutePage = () => {

  


  return (
    <UserProvider>
      <Router>
        <div>
          <NavBar  />
          <Routes>
            <Route path="/" element={<HomepageWrapper />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-property" element={<PropertyForm />} />
            <Route path="/user" element={<User />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-adds" element={<MyAdds />} />
            <Route path="/update-property/:property_id" element={<UpdateProperty />} />
            <Route path="/delete-property/:id" element={<DeleteProperty />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default RoutePage;
