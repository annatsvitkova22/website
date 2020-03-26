import React from 'react';

const Logo = (props) => {
  const { logoData } = props;

  return <img src={logoData.mediaItemUrl} alt="Logo" className="logo" />;
};

export default Logo;
