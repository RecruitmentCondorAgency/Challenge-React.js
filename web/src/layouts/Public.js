import React from 'react';
import { Outlet } from 'react-router-dom';
import * as styles from './public.module.css';
import HeaderMenu from '../components/HeaderMenu';
import HeaderLogo from '../components/HeaderLogo';
import Main from '../components/Main';

const PublicLayout = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.imageContainer}>
          <HeaderLogo />
        </div>
        <HeaderMenu />
      </header>
      <Main centered>
        <Outlet />
      </Main>
    </div>
  );
};

export default PublicLayout;
