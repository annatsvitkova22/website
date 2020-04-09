import React from 'react';
import PropTypes from 'prop-types';

import Icons from './Icons';

const Search = ({ color }) => {
  return (
    <a href="#">
      <Icons icon={'search'} color={color} />
    </a>
  );
};

Search.propTypes = {
  color: PropTypes.string,
};

export default Search;
