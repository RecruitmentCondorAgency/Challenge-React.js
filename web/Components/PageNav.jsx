import { Link, NavLink } from 'react-router-dom';
import logo from './logo.png';
import { React } from 'react';
import { useState } from 'react';

import '../styles.css';
import './ComponentStyles.css';

function PageNav() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <img className="header-logo" src={logo} alt="Logo" />
        <nav className="header-nav">
          <ul>
            {/* <li>
              <NavLink style={{ color: 'blue' }} to="/">
                Login
              </NavLink>
            </li> */}
            <li>
              <NavLink style={{ color: 'blue' }} to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink style={{ color: 'blue' }} to="/search">
                Search
              </NavLink>
            </li>
            <li>
              <a style={{ color: 'blue' }} href="/">
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default PageNav;
