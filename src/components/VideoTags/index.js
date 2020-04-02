import React from 'react';

import Play from '~/static/images/play';

const VideoTags = ({ tags }) => {
  return (
    <div className="container">
      {tags.map((tag, i) => {
        const { nodes } = tag.videos;
        if (nodes.length) {
          return (
            <div key={i} className="row video-tag">
              <div className="col-12">
                <p>{tag.name}</p>
              </div>
              {nodes.slice(0, 4).map((video, k) => (
                <div key={k} className="col-3">
                  <div
                    className="video-tag__image"
                    style={{
                      backgroundImage: `url(${video.zmVideoACF.videoCover.mediaItemUrl})`,
                    }}
                  >
                    <Play />
                  </div>
                  <p>11:02</p>
                  <p>{video.title}</p>
                </div>
              ))}
            </div>
          );
        }
        return '';
      })}
    </div>
  );
};

export default VideoTags;
