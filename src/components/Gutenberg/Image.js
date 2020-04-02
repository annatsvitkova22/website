import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ block }) => {
  const style = {
    alignSelf: block.attributes.align,
  };
  // TODO: implement all other attributes
  // TODO: if block.attributes.linkDestination === 'media' then open modal with image
  const image = (
    <img
      src={block.attributes.url}
      alt={block.attributes.alt}
      className={block.attributes.className}
      style={style}
    />
  );
  if (block.attributes.caption) {
    return (
      <figure>
        {image}
        <figcaption>{block.attributes.caption}</figcaption>
      </figure>
    );
  }
  if (block.attributes.href) {
    return (
      <a href={block.attributes.href} target="_blank">
        {image}
      </a>
    );
  }
  return image;
};

Image.propTypes = {
  block: PropTypes.any,
};

export default Image;
