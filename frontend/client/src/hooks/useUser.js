import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useUser() {
  const { setUser } = useAuth();
  const axiosPrivateInstance = useAxiosPrivate();

  async function getUser() {
    try {
      const { data } = await axiosPrivateInstance.get('auth/user');
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // You might want to handle the error, e.g., by logging out the user or showing an error message
    }
  }

  return getUser;
}
