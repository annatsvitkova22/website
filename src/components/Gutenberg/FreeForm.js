import React from 'react';
import PropTypes from 'prop-types';

const FreeForm = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
      className={className}
    />
  );
};

FreeForm.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default FreeForm;
