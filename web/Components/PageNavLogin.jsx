import { Link, NavLink } from 'react-router-dom';
import logo from './logo.png';
import { React } from 'react';
import { useState } from 'react';

import '../styles.css';
import './ComponentStyles.css';

function PageNavLogin() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <img className="header-logo" src={logo} alt="Logo" />
        <nav className="header-nav">
          <ul>
            <li>
              <NavLink style={{ color: 'blue' }} to="/search">
                Search
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default PageNavLogin;
