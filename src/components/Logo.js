import React from 'react';

const Logo = (props) => {
  const { logoData } = props;

  return <img src={logoData} alt="" className="logo" />;
};

export default Logo;
