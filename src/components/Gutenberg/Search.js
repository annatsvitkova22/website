import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

Search.propTypes = {
  block: PropTypes.any,
};

export default Search;
