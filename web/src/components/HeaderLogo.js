import React from 'react';

const logo = new URL('../../../graphics/logo.png', import.meta.url);

const HeaderLogo = () => {
  return <img src={logo} width="40" height="40" />;
};

export default HeaderLogo;
