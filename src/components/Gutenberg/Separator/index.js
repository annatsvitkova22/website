import React from 'react';
import PropTypes from 'prop-types';

const Separator = ({ block, className = '' }) => {
  return (
    <div
      className={`gutenberg__separator ${className}`}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Separator.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Separator;
