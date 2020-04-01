import React from 'react';
import PropTypes from 'prop-types';

const Soundcloud = ({ block }) => {
  return (
    <figure className={block.attributes.className}>
      <iframe
        width="100%"
        height="500"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src={block.attributes.url}
      />
      <figcaption>{block.attributes.caption}</figcaption>
    </figure>
  );
};

Soundcloud.propTypes = {
  block: PropTypes.any,
};

export default Soundcloud;
