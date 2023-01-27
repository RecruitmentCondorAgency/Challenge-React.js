import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext, useAuth } from '../lib/contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/search';
  if (!user) {
    return <Navigate to="/login" state={{ from }} replace />;
  }

  return children;
};

export default RequireAuth;
