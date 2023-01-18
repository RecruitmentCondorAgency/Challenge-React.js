import React from 'react';
import { NavLink } from 'react-router-dom';
import { getMenuClasses } from '../utils/helpers';

const NavItem = () => {
  return (
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
  );
};

export default NavItem;
