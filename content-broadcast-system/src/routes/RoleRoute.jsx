import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const RoleRoute = ({ children, allowedRole }) => {
  const role = getUserRole();

  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleRoute;
