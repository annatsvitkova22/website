import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({ block, className = '' }) => {
  return (
    <div
      className={`${className}${block.attributes.className}`}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Spacer.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Spacer;
