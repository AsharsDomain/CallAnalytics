import { Navigate } from "react-router-dom";
 // Assuming you have a custom hook for authentication
import { useAuth } from "./useAuth";
const RoleGuard = ({ children, allowedRoles }) => {
  const { user } = useAuth(); // Get user data, including role (implement useAuth if not already done)

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/admin" replace />; // Redirect to home if user doesn't have the correct role
  }

  return children; // Render the children components if the user has the correct role
};

export default RoleGuard;
