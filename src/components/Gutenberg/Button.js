import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ block }) => {
  const style = {
    color: block.attributes.textColor,
    backgroundColor: block.attributes.backgroundColor,
    textAlign: block.attributes.align,
    borderRadius: block.attributes.borderRadius,
  };
  return (
    <a
      href={block.attributes.url}
      style={style}
      className={block.attributes.className}
    >
      {block.attributes.text}
    </a>
  );
};

Button.propTypes = {
  block: PropTypes.any,
};

export default Button;
