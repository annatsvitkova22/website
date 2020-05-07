import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ block, className = '' }) => {
  return (
    <div
      className={`${className}${block.attributes.className}`}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

Search.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Search;
