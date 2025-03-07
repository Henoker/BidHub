import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>; // Avoid flickering issues
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
