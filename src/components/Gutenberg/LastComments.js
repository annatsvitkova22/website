import React from 'react';
import PropTypes from 'prop-types';

const LastComments = ({ block }) => {
  return (
    <div
      className={block.attributes.className}
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
    />
  );
};

LastComments.propTypes = {
  block: PropTypes.any,
};

export default LastComments;
