import React from 'react';
import PropTypes from 'prop-types';

const Vimeo = ({ block, className = '' }) => {
  const videoUrl = block.attributes.url.replace(
    'https://vimeo.com/',
    'https://player.vimeo.com/video/'
  );
  return (
    <div className={`${className} gutenberg__vimeo`}>
      <figure className={block.attributes.className}>
        <iframe
          className="gutenberg__vimeo-iframe"
          src={videoUrl}
          frameborder="0"
          width={'648px'}
          height={'400px'}
          responsive={true}
          title={block.attributes.caption}
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        />
        <figcaption>{block.attributes.caption}</figcaption>
      </figure>
    </div>
  );
};

Vimeo.propTypes = {
  block: PropTypes.object,
  className: PropTypes.string,
};

export default Vimeo;
