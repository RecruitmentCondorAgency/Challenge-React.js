import { Outlet } from 'react-router-dom';
import * as styles from './public.module.css';
import HeaderMenu from '../components/HeaderMenu';
import HeaderLogo from '../components/HeaderLogo';
import RequireAuth from '../components/RequireAuth';
import Main from '../components/Main';
import { AuthProvider } from '../lib/contexts/AuthContext';

const PrivateLayout = () => {
  return (
    <AuthProvider>
      <div>
        <header className={styles.header}>
          <div className={styles.imageContainer}>
            <HeaderLogo />
          </div>
          <HeaderMenu />
        </header>
        <Main>
          <Outlet />
        </Main>
      </div>
    </AuthProvider>
  );
};

export default PrivateLayout;
