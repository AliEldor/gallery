import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/config"

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  

  return(
  <div className='login-outer-container'>
      <div className='login-container'>
        <div className='login-area'>
          <h3>LOGIN TO Gallery</h3>
          <form id="login-form" className='login-items' onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              className='login' 
              name="email" 
              placeholder='Enter your email' 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className='login' 
              name="password" 
              placeholder="Enter Your Password" 
              value={formData.password}
              required 
            />
            <input 
              type="submit" 
              className='login-btn' 
              value="Login" 
            />
          </form>
          <p className='reg'>
            New to FAQ? <Link className='a' to="/register">Create an Account</Link>
          </p>
        </div>
      </div>
    </div>
  )
};

export default Login;
