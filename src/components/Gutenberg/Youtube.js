import React from 'react';
import PropTypes from 'prop-types';

const Youtube = ({ block, className = '' }) => {
  console.log(block);
  const YoutubeUrl = block.attributes.url.replace(
    'https://www.youtube.com/watch?v=',
    'https://www.youtube.com/embed/'
  );
  console.log(YoutubeUrl);
  return (
    <div className={`${className} gutenberg__youtube`}>
      <iframe
        src={YoutubeUrl}
        width={'696'}
        height={'422'}
        frameBorder="0"
        allowFullScreen
        ng-show="showvideo"
      />
    </div>
  );
};

export default Youtube;

Youtube.propTypes = {
  block: PropTypes.any,
};
