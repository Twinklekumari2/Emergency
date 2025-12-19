import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("admin"); 

  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;