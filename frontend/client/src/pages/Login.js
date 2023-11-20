import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AxiosInstance } from '../axios/AxiosInstance';

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
      const response = await AxiosInstance.post('auth/login', JSON.stringify(formData));

      setAccessToken(response?.data?.accessToken);
      setCSRFToken(response.headers['x-csrf-token']);
      setFormData({ email: '', password: '' });
      setLoading(false);

      navigate(fromLocation, { replace: true });
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error);
      // Handle errors, e.g., show error message to the user
    }
  };


  return (
    <div className="bg-gray-900">
    <div className="flex justify-center h-screen">
      <div
        className="hidden bg-cover lg:block lg:w-2/3"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
        }}
      >
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Meraki UI
            </h2>
            <p className="max-w-xl mt-3 text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem
              ipsa, nulla laboriosam dolores, repellendus perferendis libero
              suscipit nam temporibus molestiae
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </div>
            <p className="mt-3 text-gray-300">
              Sign in to access your account
            </p>
          </div>
          <div className="mt-8">
            <form onSubmit={onSubmitForm}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-200"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  onChange={onInputChange}
                  value={formData.email}
                  required
                  className="block w-full px-4 py-2 mt-2 border rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-200"
                  >
                    Password
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onInputChange}
                  required
                  className="block w-full px-4 py-2 mt-2 border rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              
              
							<button 
              className="w-full mt-6 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              disabled={loading}>
							<span>Login </span>
           	  </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-400">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  );
}
