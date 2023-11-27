import * as React from 'react';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthRouteProps {
  children: React.ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? <>{children}</> : null;
}

export default AuthRoute;
