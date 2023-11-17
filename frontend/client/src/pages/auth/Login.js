import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { setAccessToken, setCSRFToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.from?.pathname || '/';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axiosInstance.post('auth/login', formData);

      setAccessToken(response?.data?.accessToken);
      setCSRFToken(response.headers['x-csrf-token']);
      setFormData({ email: '', password: '' });
      setLoading(false);

      navigate(fromLocation, { replace: true });
    } catch (error) {
      setLoading(false);
      // TODO: handle errors
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={onSubmitForm}>
        <div className='mb-3'>
          <input
            type='email'
            placeholder='Email'
            autoComplete='off'
            className='form-control'
            id='email'
            name='email'
            value={formData.email}
            onChange={onInputChange}
          />
        </div>
        <div className='mb-3'>
          <input
            type='password'
            placeholder='Password'
            autoComplete='off'
            className='form-control'
            id='password'
            name='password'
            value={formData.password}
            onChange={onInputChange}
          />
        </div>
        <div className='mb-3'>
          <button disabled={loading} className='btn btn-success' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
