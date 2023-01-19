import { createContext, useContext } from 'react';
import { initialState } from '../reducers/user';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/helpers';
import FetchBuilder from '../../utils/fetchBuilder';
import toast from 'react-hot-toast';

const AuthContext = createContext({
  state: initialState,
  dispatch: {}
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const logout = async () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const login = async (data) => {
    const builder = new FetchBuilder('users');
    const users = await fetchData(builder, () => alert('error de login'));
    const user = users.find((usr) => usr.email === data.email && usr.password === data.password);
    if (!user) {
      return toast('User not found');
    }
    setUser(user);
    navigate('/', { replace: true });
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        setUser
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
