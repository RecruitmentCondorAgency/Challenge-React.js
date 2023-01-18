import React from 'react';
import * as styles from '../layouts/public.module.css';
import NavItem from './NavItem';

const HeaderMenu = () => {
  return (
    <ul className={styles.headerMenu}>
      <NavItem to="search" label="Search" />
      <NavItem to="/universities" label="Profile" />
      <NavItem to="search" label="Logout" />
    </ul>
  );
};

export default HeaderMenu;
