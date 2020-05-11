import React from 'react';
import PropTypes from 'prop-types';

const Audio = ({ block, className = '' }) => {
  return (
    <>
      {block.attributes && (
        <div className={`${className} gutenberg__audio`}>
          <figure className="gutenberg__audio-player">
            <figcaption>{block.attributes.caption}</figcaption>
            <audio controls src={block.attributes.src} />
          </figure>
        </div>
      )}
    </>
  );
};

export default Audio;

Audio.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};
