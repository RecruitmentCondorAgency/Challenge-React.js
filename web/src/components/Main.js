import React from 'react';
import * as styles from '../layouts/public.module.css';
// import AuthStatus from './AuthStatus';

const Main = ({ children }) => {
  return (
    <main className={styles.mainContainer}>
      {/* <AuthStatus /> */}
      {children}
    </main>
  );
};

export default Main;
