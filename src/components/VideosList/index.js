import React from 'react';
import PropTypes from 'prop-types';

import Play from '~/static/images/play';

const VideosList = ({ videos, onVideoSelect }) => (
  <ul className="list-unstyled videos-list">
    {videos.map((video, i) => {
      const { title, zmVideoACF } = video;
      function onClick() {
        return onVideoSelect(zmVideoACF.videoUrl, title);
      }
      return (
        <li key={i} onClick={onClick} className="videos-list__item video-item">
          <div className="video-item__wrapper">
            <Play />
            <div className="video-item__duration">8:00</div>
          </div>
          {title}
        </li>
      );
    })}
  </ul>
);

VideosList.propTypes = {
  videos: PropTypes.array,
  onVideoSelect: PropTypes.func,
};

export default VideosList;
