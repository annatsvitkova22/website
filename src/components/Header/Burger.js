import React from 'react';

const Burger = ({ handleOpenClick, className = ''}) => {
  return (
    <div className={`header__burger-button`} onClick={handleOpenClick}>
      <div className={`${className} header__burger-icon`} />
    </div>
  );
};

export default Burger;
