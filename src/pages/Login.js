// src/pages/Login.js
import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import '../assets/css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    if(email === 'admin@gmail.com' && password === 'admin') {
      alert('Login successful');
      
      setEmail('');
      setPassword('');

      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <FormInput 
              id="email" 
              label="Email address" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <FormInput 
              id="password" 
              label="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button type="submit" className="btn btn-primary w-100">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;