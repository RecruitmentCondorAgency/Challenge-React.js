import React from 'react';
import { Link } from 'react-router-dom';

const logo = new URL('../../../graphics/logo.png', import.meta.url);

const HeaderLogo = () => {
  return (
    <Link to="/">
      <img src={logo} width="40" height="40" />
    </Link>
  );
};

export default HeaderLogo;
