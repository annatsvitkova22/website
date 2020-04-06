import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

Categories.propTypes = {
  block: PropTypes.any,
};

export default Categories;
