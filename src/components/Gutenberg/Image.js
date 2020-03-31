import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ block }) => {
  // TODO: implement all other attributes
  // TODO: if block.attributes.linkDestination === 'media' then open modal with image
  const image = <img src={block.attributes.url} alt={block.attributes.alt} />;
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
