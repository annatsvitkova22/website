import React from 'react';
import PropTypes from 'prop-types';

const LatestPosts = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

LatestPosts.propTypes = {
  block: PropTypes.any,
};

export default LatestPosts;
