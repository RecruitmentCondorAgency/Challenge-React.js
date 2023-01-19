import * as styles from '../layouts/public.module.css';
import NavItem from './NavItem';
import { useAuth } from '../lib/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeaderMenu = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  return user ? (
    <ul className={styles.headerMenu}>
      <NavItem to="/" label="Search" />
      <NavItem to="/profile" label="Profile" />
      <NavItem
        to="/"
        label="Logout"
        clickHandler={(e) => {
          e.preventDefault();
          setUser(null);
          navigate('/login', { replace: true });
        }}
      />
    </ul>
  ) : null;
};

export default HeaderMenu;
