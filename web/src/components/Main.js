import React from 'react';
import * as styles from '../layouts/public.module.css';
// import AuthStatus from './AuthStatus';

const Main = ({ children, centered = false }) => {
  return (
    <main className={`${styles.mainContainer} ${centered ? styles.centered : ''}`}>
      {/* <AuthStatus /> */}
      {children}
    </main>
  );
};

export default Main;
