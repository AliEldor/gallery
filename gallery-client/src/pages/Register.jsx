import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config/config";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
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

  

  return (
    <div className="login-outer-container">
      <div className="login-container">
        <div className="login-area">
          <h3>REGISTER TO Gallery</h3>
          <form
            id="register-form"
            className="login-items"
            
          >
            <label htmlFor="fullname">Name</label>
            <input
              type="text"
              className="login"
              name="fullname"
              placeholder="Enter your name"
              value={formData.fullname}
              
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="login"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="login"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              
              required
            />
            <input type="submit" className="login-btn" value="Register" />
          </form>
          <p className="reg">
            Already have an account?
            <Link className="a" to="/login">
              Please Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
