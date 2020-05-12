import React from 'react';
import PropTypes from 'prop-types';

const Facebook = ({ block, className = '' }) => {
  return (
    <div className={`${className} gutenberg__facebook`}>
      <figure className={block.attributes.className}>
        <iframe
          className="gutenberg__facebook-iframe"
          src={block.attributes.url}
          width={'648px'}
          height={'400px'}
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
        />
      </figure>
    </div>
  );
};

Facebook.propTypes = {
  block: PropTypes.object,
  className: PropTypes.string,
};

export default Facebook;
