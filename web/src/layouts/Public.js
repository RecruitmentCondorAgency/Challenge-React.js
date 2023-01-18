import React from 'react';
import { Outlet } from 'react-router-dom';
import * as styles from './public.module.css';
import HeaderMenu from '../components/HeaderMenu';
import HeaderLogo from '../components/HeaderLogo';

const PublicLayout = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.imageContainer}>
          <HeaderLogo />
        </div>
        <HeaderMenu />
      </header>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
