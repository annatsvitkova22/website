import React from 'react';

const Logo = (props) => {
  const { logoData } = props;

  return (
    <img src={logoData.mediaItemUrl} alt={logoData.title} className="logo" />
  );
};

export default Logo;
