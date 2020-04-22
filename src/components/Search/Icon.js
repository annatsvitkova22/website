import React from 'react';
import PropTypes from 'prop-types';

import Icons from '../Icons';

const SearchIcon = ({ color, className = '', onClick = () => {} }) => {
  return (
    <button className={className} onClick={onClick}>
      <Icons icon={'search'} color={color} />
    </button>
  );
};

SearchIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default SearchIcon;
