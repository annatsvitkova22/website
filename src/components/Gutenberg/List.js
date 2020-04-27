import React from 'react';
import PropTypes from 'prop-types';

const List = ({ block, className = '' }) => {
  if (block.attributes.ordered) {
    return (
      <ol
        className={`${block.attributes.className} ordered-list ${className}`}
        dangerouslySetInnerHTML={{ __html: block.attributes.values }}
      />
    );
  }
  return (
    <ul
      className={`${block.attributes.className} unordered-list ${className}`}
      dangerouslySetInnerHTML={{ __html: block.attributes.values }}
    />
  );
};

List.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default List;
