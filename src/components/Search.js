import React from 'react';
import PropTypes from 'prop-types';

import Icons from './Icons';

const Search = ({ color, className = '' }) => {
  return (
    <a href="#" className={className}>
      <Icons icon={'search'} color={color} />
    </a>
  );
};

Search.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Search;
