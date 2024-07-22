import React, { useState, useEffect } from 'react';
import '../assets/css/Login.css';
import loginUser from '../services/Auth';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import mainlogo from '../assets/img/mainlogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          const token = response.data.token;
          Cookies.set('token', token, { expires: 1 });
          Cookies.set('fullname', response.data.fullname, { expires: 1 });
          Cookies.set('email', response.data.email, { expires: 1 });
          navigate('/dashboard');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response ? error.response.data.message || 'An error occurred' : 'An error occurred',
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center">
        <div className="col-xl-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="p-5" style={{ paddingTop: '20px' }}>
                <div className="text-center">
                  <img src={mainlogo} alt="Logo" style={{ width: '200px', height: 'auto', display: 'block', margin: '0 auto' }} />
                  <h1 className="h4 text-black mb-4 mt-3">Welcome Back!</h1>
                  <p className="text-muted" style={{ fontSize: 14 }}>
                    Login to access your dashboard. If you are not a member,
                    please contact the administrator.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="user">
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email Address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-user col-12 btn-block"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;