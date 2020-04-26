import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({ block, className = '' }) => {
  return (
    <div
      className={`${className} gutenberg__button`}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Buttons.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Buttons;
