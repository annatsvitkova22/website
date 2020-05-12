import React from 'react';
import PropTypes from 'prop-types';

const Youtube = ({ block, className = '' }) => {
  const YoutubeUrl = block.attributes.url.replace(
    'https://www.youtube.com/watch?v=',
    'https://www.youtube.com/embed/'
  );
  return (
    <div className={`${className} gutenberg__youtube`}>
      <iframe
        src={YoutubeUrl}
        width={'560'}
        height={'349'}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default Youtube;

Youtube.propTypes = {
  block: PropTypes.any,
};
