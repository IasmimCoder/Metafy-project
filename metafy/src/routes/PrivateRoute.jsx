import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Importe o hook de autenticação

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();  // Use o hook para verificar a autenticação

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
