import React from 'react';
import * as styles from '../layouts/public.module.css';
// import AuthStatus from './AuthStatus';
import { Toaster } from 'react-hot-toast';

const Main = ({ children, centered = false }) => {
  return (
    <main className={`${styles.mainContainer} ${centered ? styles.centered : ''}`}>
      {/* <AuthStatus /> */}
      {children}
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FF7B54',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
      />
    </main>
  );
};

export default Main;
