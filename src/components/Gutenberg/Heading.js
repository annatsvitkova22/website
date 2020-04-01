import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ block }) => {
  const style = {
    textAlign: block.attributes.align,
    color: block.attributes.textColor,
  };
  if (block.attributes.level === 1)
    return (
      <h1 style={style} className={block.attributes.className}>
        {block.attributes.content}
      </h1>
    );
  if (block.attributes.level === 2)
    return (
      <h2 style={style} className={block.attributes.className}>
        {block.attributes.content}
      </h2>
    );
  if (block.attributes.level === 3)
    return (
      <h3 style={style} className={block.attributes.className}>
        {block.attributes.content}
      </h3>
    );
  if (block.attributes.level === 4)
    return (
      <h4 style={style} className={block.attributes.className}>
        {block.attributes.content}
      </h4>
    );
  if (block.attributes.level === 5)
    return (
      <h5 style={style} className={block.attributes.className}>
        {block.attributes.content}
      </h5>
    );
};

export default Heading;

Heading.propTypes = {
  block: PropTypes.any,
};
