import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FreeForm = ({ block, className = '' }) => {
  const blockCls = classNames({
    gutenberg__freeform: true,
    'gutenberg__freeform-old': block && block.saveContent,
  });
  const data = block && block.saveContent ? block.saveContent : block;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data }}
      className={`${blockCls} ${className}`}
    />
  );
};

FreeForm.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default FreeForm;
