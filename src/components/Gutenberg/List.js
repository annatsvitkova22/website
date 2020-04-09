import React from 'react';
import PropTypes from 'prop-types';

const List = ({ block }) => {
  if (block.attributes.ordered) {
    return (
      <ol
        className={`${block.attributes.className} unordered-list`}
        dangerouslySetInnerHTML={{ __html: block.attributes.values }}
      />
    );
  }
  return (
    <ul
      className={`${block.attributes.className} unordered-list`}
      dangerouslySetInnerHTML={{ __html: block.attributes.values }}
    />
  );
};

List.propTypes = {
  block: PropTypes.any,
};

export default List;
