import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ block }) => {
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
    <p
      style={style}
      className={attributes.className}
      dangerouslySetInnerHTML={{ __html: attributes.content }}
    />
  );
};

Paragraph.propTypes = {
  block: PropTypes.any,
};

export default Paragraph;
