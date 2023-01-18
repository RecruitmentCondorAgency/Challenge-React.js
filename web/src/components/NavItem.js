import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from '../layouts/public.module.css';
import { getMenuClasses } from '../utils/helpers';

const NavItem = ({ to, label, clickHandler }) => {
  return (
    <li>
      <NavLink
        to={to}
        onClick={clickHandler}
        className={({ isActive, isPending }) =>
          getMenuClasses({
            isActive,
            isPending,
            menuLink: styles.menuLink,
            aciveLink: styles.activeLink,
            pendingLink: styles.pendingLink
          })
        }>
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
