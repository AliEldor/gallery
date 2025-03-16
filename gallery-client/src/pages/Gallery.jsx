import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config/config"

const Gallery = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Redirect to login if no userId found
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear  localStorage
    localStorage.removeItem('userId');
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Gallery;