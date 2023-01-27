import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../lib/contexts/AuthContext';
import { LOG_OUT } from '../lib/reducers/constants';

const AuthStatus = () => {
  const { state, dispatch } = useAuth();
  let navigate = useNavigate();

  if (!state.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {state.email}!{' '}
      <button
        onClick={() => {
          dispatch({
            type: LOG_OUT
          });
          navigate('/login');
        }}>
        Sign out
      </button>
    </p>
  );
};

export default AuthStatus;
