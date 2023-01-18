import React from 'react';
import * as styles from '../layouts/public.module.css';
import { NavLink } from 'react-router-dom';
import { getMenuClasses } from '../utils/helpers';

const HeaderMenu = () => {
  return (
    <ul className={styles.headerMenu}>
      <li>
        <NavLink
          to={`search`}
          className={({ isActive, isPending }) =>
            getMenuClasses({
              isActive,
              isPending,
              menuLink: styles.menuLink,
              aciveLink: styles.activeLink,
              pendingLink: styles.pendingLink
            })
          }>
          Search
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`profile`}
          className={({ isActive, isPending }) =>
            getMenuClasses({
              isActive,
              isPending,
              menuLink: styles.menuLink,
              aciveLink: styles.activeLink,
              pendingLink: styles.pendingLink
            })
          }>
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`logout`}
          className={({ isActive, isPending }) =>
            getMenuClasses({
              isActive,
              isPending,
              menuLink: styles.menuLink,
              aciveLink: styles.activeLink,
              pendingLink: styles.pendingLink
            })
          }>
          Logout
        </NavLink>
      </li>
    </ul>
  );
};

export default HeaderMenu;
