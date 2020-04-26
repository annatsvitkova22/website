import React from 'react';
import PropTypes from 'prop-types';

const Audio = ({ block, className = '' }) => {
  if (block.attributes) {
    return (
      <figure className={`gutenberg__audio ${className}`}>
        <figcaption>{block.attributes.caption}</figcaption>
        <audio controls src={block.attributes.src} />
      </figure>
    );
  }
  return <audio controls src="#" />;
};

export default Audio;

Audio.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};
