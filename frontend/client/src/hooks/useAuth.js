import { useContext, useDebugValue } from "react";
import { AuthContext } from "../store/auth-context";

export default function useAuth() {
  const authContextValue = useContext(AuthContext);

  const isLoggedIn = authContextValue.user && authContextValue.user.username;

  useDebugValue(isLoggedIn ? 'Logged In' : 'Logged Out');

  return authContextValue;
}
