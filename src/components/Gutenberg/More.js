import React from 'react';
import PropTypes from 'prop-types';

const More = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
      className={className}
    />
  );
};

More.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default More;
