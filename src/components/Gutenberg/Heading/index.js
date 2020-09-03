import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
      className={`gutenberg__heading ${className}`}
    />
  );
};

export default Heading;

Heading.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};
