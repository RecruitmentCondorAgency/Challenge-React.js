import { AuthContext } from '../../../lib/contexts/AuthContext';
import login from '../../../lib/actions/login';
import { LOGGED_IN } from '../../../lib/reducers/constants';
import { useContext } from 'react';

const useLogin = () => {
  const { dispatch } = useContext(AuthContext);

  return async (data) => {
    const user = await login(data);
    if (user) {
      dispatch({
        type: LOGGED_IN,
        payload: user
      }); // else notificar
    }
  };
};

export default useLogin;
