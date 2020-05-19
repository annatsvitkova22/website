import React from 'react';
import PropTypes from 'prop-types';

const FreeForm = ({ block, className = '' }) => {
  const data = block && block.saveContent ? block.saveContent : block;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data }}
      className={`${className}`}
    />
  );
};

FreeForm.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default FreeForm;
