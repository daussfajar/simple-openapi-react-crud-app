import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import '../assets/css/Login.css';
import loginUser from '../services/Auth';
import Swal from 'sweetalert2';

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
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter your email and password',
      });
    }

    try {
      const response = await loginUser(email, password);      

      if (response.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.message || 'An error occurred',
        });
        setPassword('');
        return;
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message || 'Login successful',
        }).then(() => {
          window.location.href = '/dashboard';
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message || 'An error occurred',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred',
        });
      }
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