import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../lib/contexts/AuthContext';

const useVerifyAuth = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/search';

  if (state.user) navigate(from, { replace: true });
};

export default useVerifyAuth;
