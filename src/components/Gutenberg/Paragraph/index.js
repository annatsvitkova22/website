import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ block, className = '' }) => {
  // TODO: implement all other attributes
  const { attributes } = block;
  const style = {
    fontSize: attributes.fontSize,
    textAlign: attributes.align,
    backgroundColor: attributes.backgroundColor,
    direction: attributes.direction,
    color: attributes.textColor,
    width: attributes.width,
  };

  return (
    <div
      style={style}
      className={`${attributes.className} gutenberg__paragraph ${className}`}
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
    />
  );
};

Paragraph.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Paragraph;
