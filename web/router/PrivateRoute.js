import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
    if (!userLogged || userLogged === '') {
        return <Navigate to="/login" />
    } else {
        return children
    }
  };