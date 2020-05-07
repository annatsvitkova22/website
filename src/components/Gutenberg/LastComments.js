import React from 'react';
import PropTypes from 'prop-types';

const LastComments = ({ block, className = '' }) => {
  return (
    <div
      className={`${className} ${block.attributes.className}`}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

LastComments.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default LastComments;
