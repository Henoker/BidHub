import { axiosPrivateInstance } from "../axios/AxiosInstance";
import useAuth from "./useAuth";

export default function useLogout() {
  const { setUser, setAccessToken, setCSRFToken } = useAuth();

  const logout = async () => {
    try {
      const response = await axiosPrivateInstance.post("auth/logout");

      if (response.status === 200) {
        // Logout successful
        setAccessToken(null);
        setCSRFToken(null);
        setUser({});
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status during logout:", response.status);
      }
    } catch (error) {
      // Handle logout error
      console.error("Error during logout:", error);
    }
  };

  return logout;
}
