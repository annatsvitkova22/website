import React from 'react';
import PropTypes from 'prop-types';

const Pullquote = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.originalContent }}
      className={`gutenberg__pullquote ${className}`}
    />
  );
};

Pullquote.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Pullquote;
