import React from 'react';
import PropTypes from 'prop-types';

import PhotoSwipeGallery from './PhotoSwipeGallery';

import formatYouTubeUrl from '~/util/formatYouTubeUrl';
import Play from '~/static/images/play';

const VideoTags = ({ tags }) => {
  function getThumbnailContent(item) {
    return (
      <>
        <div
          className="video-tag__thumbnail bg-cover pos-relative"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        >
          <Play />
        </div>
        <p className="video-tag__duration">{item.duration}</p>
        <h4 className="video-tag__name">{item.name}</h4>
      </>
    );
  }

  return (
    <div className="container">
      {tags.map((tag, i) => {
        const { nodes } = tag.videos;
        if (nodes.length) {
          const options = {
            shareEl: false,
            galleryUID: i,
            bgOpacity: 0.75,
          };
          const tagItems = nodes.slice(0, 4).map((video) => ({
            html: `
            <div class="video-tag__iframe">
              <iframe src="${formatYouTubeUrl(
                video.zmVideoACF.videoUrl
              )}" frameborder="0"></iframe>
              <div class="video-tag__info">
                <h3>${video.title}</h3>
                <div>${video.excerpt}</div>
              </div>
            </div>
            `,
            thumbnail: video.zmVideoACF.videoCover.mediaItemUrl,
            name: video.title,
            duration: video.zmVideoACF.duration,
          }));
          return (
            <div key={i} className="row video-tag">
              <div className="col-6">
                <p className="video-tag__title">{tag.name}</p>
              </div>
              <div className="col-6 text-right tx-green">
                <a href="#" className="video-tag__watch-all">
                  Дивись Усі
                </a>
              </div>
              <PhotoSwipeGallery
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
