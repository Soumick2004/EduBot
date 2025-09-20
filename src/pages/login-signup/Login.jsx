import React, { useState } from 'react';
import './Auth.css';
import { login } from '/src/firebase/auth'; // path to your Firebase auth file

const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Login data:', formData);
  //   // Add login logic here
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  try {
    const userCredential = await login(email, password);
    console.log('User logged in:', userCredential.user);
    // You can navigate to dashboard or landing page
    onNavigate('chatbot'); 
  } catch (error) {
    console.error('Login error:', error.message);
    alert(error.message); // show error to user
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your EduBOT account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <a href="#" onClick={() => onNavigate('signup')}>Sign up</a></p>
          <p><a href="#" onClick={() => onNavigate('landing')} className="back-link">← Back to Home</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
