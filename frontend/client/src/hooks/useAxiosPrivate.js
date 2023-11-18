
import { useEffect } from 'react';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { axiosPrivateInstance } from '../axios/AxiosInstance';

export default function useAxiosPrivate() {
  const { accessToken, csrftoken, user, setAccessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          config.headers['X-CSRFToken'] = csrftoken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
            setAccessToken(newAccessToken);
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            prevRequest.headers['X-CSRFToken'] = newCSRFToken;
            return axiosPrivateInstance(prevRequest);
          } catch (refreshError) {
            // Handle refresh error, e.g., log out the user
            console.error('Error refreshing access token:', refreshError);
            // Redirect to the login page or perform any other necessary action
            // logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, user, setAccessToken, csrftoken, refresh]);

  return axiosPrivateInstance;
}
