import { React } from 'react';
import logo from './logo.png';
import '../styles.css';
import './ComponentStyles.css';

export function Logo() {
  return (
    <>
      <div style={{ backgroundColor: 'blue', display: 'flex' }}>
        <img style={{ width: '50px' }} src={logo} alt="Logo" />
        <div style={{ marginLeft: 'auto' }}></div>
      </div>
    </>
  );
}
