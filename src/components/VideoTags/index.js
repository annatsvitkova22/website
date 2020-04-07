import React from 'react';
import PropTypes from 'prop-types';

import PhotoSwipeGallery from './PhotoSwipeGallery';

import formatYouTubeUrl from '~/util/formatYouTubeUrl';
import Play from '~/static/images/play';

const VideoTags = ({ tags }) => {
  function getThumbnailContent(item) {
    return (
      <div
        className="video-tag__thumbnail bg-cover"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      >
        <Play />
      </div>
    );
  }

  return (
    <div className="container">
      {tags.map((tag, i) => {
        const { nodes } = tag.videos;
        if (nodes.length) {
          const options = {
            shareEl: false,
          };
          const tagItems = nodes.slice(0, 4).map((video) => ({
            html: `
            <div class="video-tag__iframe">
              <iframe src="${formatYouTubeUrl(
                video.zmVideoACF.videoUrl
              )}" frameborder="0"></iframe>
              <h3>${video.title}</h3>
              <div>${video.excerpt}</div>
            </div>
            `,
            thumbnail: video.zmVideoACF.videoCover.mediaItemUrl,
          }));
          return (
            <div key={i} className="row video-tag">
              <div className="col-12">
                <p>{tag.name}</p>
              </div>
              <PhotoSwipeGallery
                id={`${i}`}
                className="col-12"
                items={tagItems}
                options={options}
                thumbnailContent={getThumbnailContent}
              />
            </div>
          );
        }
        return '';
      })}
    </div>
  );
};

VideoTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      videos: PropTypes.object,
    })
  ),
};

export default VideoTags;
