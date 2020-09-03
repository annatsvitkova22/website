import React from 'react';
import PropTypes from 'prop-types';

const Burger = ({ handleOpenClick, className = '' }) => {
  return (
    <div
      className={`header__burger-button ${className}`}
      onClick={handleOpenClick}
    >
      <div className={`header__burger-icon`} />
    </div>
  );
};

Burger.propTypes = {
  handleOpenClick: PropTypes.any,
  className: PropTypes.string,
};

export default Burger;
