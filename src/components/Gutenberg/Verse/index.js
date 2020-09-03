import React from 'react';
import PropTypes from 'prop-types';

const Verse = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
      className={`gutenberg__verse ${className}`}
    />
  );
};

Verse.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Verse;
