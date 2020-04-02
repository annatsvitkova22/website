import React from 'react';
import PropTypes from 'prop-types';

const Soundcloud = ({ block }) => {
  return (
    <figure className={block.attributes.className}>
      <iframe
        title={block.attributes.caption}
        width="100%"
        height="500"
        scrolling="no"
        frameBorder="no"
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
