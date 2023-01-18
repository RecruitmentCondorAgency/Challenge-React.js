import { Outlet } from 'react-router-dom';
import * as styles from './public.module.css';
import HeaderMenu from '../components/HeaderMenu';
import HeaderLogo from '../components/HeaderLogo';
import RequireAuth from '../components/RequireAuth';
import Main from '../components/Main';

const PrivateLayout = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.imageContainer}>
          <HeaderLogo />
        </div>
        <HeaderMenu />
      </header>
      <Main>
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      </Main>
    </div>
  );
};

export default PrivateLayout;
