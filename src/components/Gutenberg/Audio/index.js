import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import PropTypes from 'prop-types';

const Audio = ({ block, className = '' }) => {
  return (
    <>
      {block.attributes && (
        <div className={`gutenberg__audio ${className}`}>
          <p className="gutenberg__audio-caption">{block.attributes.caption}</p>
          <AudioPlayer src={block.attributes.src} />
        </div>
      )}
    </>
  );
  /*return (
    <>
      {block.attributes && (
        <div className={`gutenberg__audio ${className}`}>
          <figure className="gutenberg__audio-player">
            <figcaption>{block.attributes.caption}</figcaption>
            <audio controls src={block.attributes.src} />
          </figure>
        </div>
      )}
    </>
  );
   */
};

export default Audio;

Audio.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};
