import React from 'react';
import PropTypes from 'prop-types';

const Archives = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
      className={className}
    />
  );
};

Archives.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Archives;
