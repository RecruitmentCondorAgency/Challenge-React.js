import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../lib/contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const { state } = useContext(AuthContext);
  const location = useLocation();
  if (!state.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
