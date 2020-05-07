import React from 'react';
import PropTypes from 'prop-types';

const TagCloud = ({ block, className = '' }) => {
  return (
    <div
      className={`${className}${block.attributes.className}`}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

TagCloud.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default TagCloud;
