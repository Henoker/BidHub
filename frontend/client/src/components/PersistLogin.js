import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useRefreshToken from '../hooks/useRefreshToken';

export default function PersistLogin() {
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { accessToken, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    const verifyUser = async () => {
      try {
        if (!accessToken) {
          await refresh();
        }

        const { data } = await axiosPrivate.get('auth/user');
        setUser(data);

        // Redirect to User.js upon successful verification
        navigate('/auth/user');
      } catch (error) {
        console.error('Error during user verification:', error);

        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received');
        } else {
          console.error('Error setting up the request:', error.message);
        }

        // If verification fails or an error occurs, redirect to the login page
        navigate('/auth/login');
      } finally {
        // Ensure that setLoading is set to false only if the component is still mounted
        isMounted && setLoading(false);
      }
    };

    verifyUser();

    return () => {
      // Set isMounted to false when the component is unmounted
      isMounted = false;
    };
  }, [accessToken, refresh, setUser, axiosPrivate, navigate]);

  return loading ? 'Loading' : <Outlet />;
}
