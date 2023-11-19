import { AxiosInstance } from "../axios/AxiosInstance";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAccessToken, setCSRFToken } = useAuth();

  const refresh = async () => {
    try {
      const response = await AxiosInstance.post('auth/refresh-token');
      setAccessToken(response.data.access);
      setCSRFToken(response.headers["x-csrftoken"]);

      return { accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"] };
    } catch (error) {
      // Handle refresh error, e.g., log out the user
      console.error('Error refreshing access token:', error);
      // Redirect to the login page or perform any other necessary action
      throw error; // Propagate the error so that the caller can handle it
    }
  };

  return refresh;
}
