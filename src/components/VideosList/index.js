import React from 'react';
import PropTypes from 'prop-types';

import Play from '~/static/images/play';

const VideosList = ({ videos, onVideoSelect, selectedIndex }) => (
  <ul className="list-unstyled videos-list">
    {videos.slice(0, 20).map((video, i) => {
      const { title } = video;
      const { videoUrl, videoCover, duration } = video.zmVideoACF;
      function onClick() {
        return onVideoSelect(
          videoUrl,
          videoCover.mediaItemUrl,
          title,
          duration,
          i
        );
      }
      return (
        <li key={i} onClick={onClick} className="videos-list__item video-item">
          <div
            className={`video-item__wrapper ${
              i === selectedIndex ? 'video-item__wrapper--current' : ''
            }`}
          >
            <Play />
            <div className="video-item__duration">
              {i === selectedIndex ? 'Відтво...' : duration}
            </div>
          </div>
          <div className="video-item__title">{title}</div>
        </li>
      );
    })}
  </ul>
);

VideosList.propTypes = {
  videos: PropTypes.array,
  onVideoSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default VideosList;
