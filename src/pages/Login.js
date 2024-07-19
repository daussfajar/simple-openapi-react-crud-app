import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import '../assets/css/Login.css';
import loginUser from '../services/Auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      const response = await loginUser(email, password);
      
      if(response.status !== 200) {
        alert(response.message)
        setPassword('');
      } else {
        alert(response.message);
        window.location.href = '/product';
      }
    } catch (error) {
      alert('An error occurred. Please try again later');
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-body">
          <h4 className="card-title text-left mb-2">
            Login to CRUD App
          </h4>
          <p>
            Please enter your email and password to login.
          </p>
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
            <Button type="submit" className="btn btn-primary w-100">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;