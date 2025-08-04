// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext"; // adjust based on your project

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext(); // Replace with your auth logic
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/registration" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
