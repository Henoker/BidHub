import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useLogout from '../../hooks/useLogout';

export default function User() {
  const { user, setUser } = useAuth();
  const axiosPrivateInstance = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    setLoading(true);

    try {
      await logout();
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error('Logout failed:', error);
      // Handle errors, e.g., show error message to the user
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axiosPrivateInstance.get('auth/user');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., show error message to the user
      }
    }

    getUser();
  }, [axiosPrivateInstance, setUser]);

  return (
    <div className='bg-gray-900'>
      <h3>{user?.username}</h3>
      <h4>{user?.email}</h4>
      <button disabled={loading} type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
