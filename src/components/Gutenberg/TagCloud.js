import React from 'react';
import PropTypes from 'prop-types';

const TagCloud = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

TagCloud.propTypes = {
  block: PropTypes.any,
};

export default TagCloud;
