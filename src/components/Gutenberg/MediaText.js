import React from 'react';
import PropTypes from 'prop-types';

const MediaText = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
      className={className}
    />
  );
};

MediaText.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default MediaText;
