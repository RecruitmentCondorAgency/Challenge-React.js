import React, { useContext } from 'react';
import * as styles from '../layouts/public.module.css';
import NavItem from './NavItem';
import { AuthContext } from '../lib/contexts/AuthContext';
import { LOG_OUT } from '../lib/reducers/constants';

const HeaderMenu = () => {
  const { dispatch, state } = useContext(AuthContext);
  return state.user ? (
    <ul className={styles.headerMenu}>
      <NavItem to="/" label="Search" />
      <NavItem to="/profile" label="Profile" />
      <NavItem
        to="/"
        label="Logout"
        clickHandler={(e) => {
          e.preventDefault();
          dispatch({
            type: LOG_OUT
          });
        }}
      />
    </ul>
  ) : null;
};

export default HeaderMenu;
