import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/uk';

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
            galleryUID: i + 1,
            bgOpacity: 0.75,
          };
          const tagItems = nodes.slice(0, 4).map((video) => {
            const { zmVideoACF, title, excerpt, date } = video;
            const { videoUrl, videoCover, duration } = zmVideoACF;
            const pubDate = new Date(date);
            return {
              html: `
            <div class="video-tag__iframe">
              <iframe src="${formatYouTubeUrl(
                videoUrl
              )}" frameborder="0"></iframe>
              <div class="video-tag__info tx-white">
                <h3>${title}</h3>
                <div>${excerpt}</div>
                <div>${moment(pubDate).format('DD MMMM YYYY HH:mm')}</div>
              </div>
            </div>
            `,
              thumbnail: videoCover.mediaItemUrl,
              name: title,
              duration,
            };
          });
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
