import React from 'react';
import PropTypes from 'prop-types';

const LatestPosts = ({ block, className = '' }) => {
  return (
    <div
      className={`${className}${block.attributes.className}`}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

LatestPosts.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default LatestPosts;
