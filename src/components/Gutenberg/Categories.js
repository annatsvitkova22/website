import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ block, className = '' }) => {
  return (
    <div
      className={`${block.attributes.className} ${className}`}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

Categories.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Categories;
