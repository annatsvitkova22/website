import React from 'react';
import PropTypes from 'prop-types';

const List = ({ block, className = '' }) => {
  if (block.attributes.ordered) {
    return (
      <ol
        className={`gutenberg__ordered-list ${block.attributes.className} ${className}`}
        dangerouslySetInnerHTML={{ __html: block.attributes.values }}
      />
    );
  }
  return (
    <ul
      className={`gutenberg__unordered-list ${block.attributes.className} ${className}`}
      dangerouslySetInnerHTML={{ __html: block.attributes.values }}
    />
  );
};

List.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default List;
