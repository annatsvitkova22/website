import React from 'react';
import PropTypes from 'prop-types';

import Play from '~/static/images/play';

const VideosList = ({ videos, onVideoSelect, selectedIndex }) => (
  <ul className="list-unstyled videos-list">
    {videos.slice(0, 6).map((video, i) => {
      const { title, zmVideoACF } = video;
      function onClick() {
        return onVideoSelect(zmVideoACF.videoUrl, title, i);
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
              {i === selectedIndex ? 'Playing' : '8:00'}
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
