import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/uk';
import Link from 'next/link';

import PhotoSwipeGallery from './PhotoSwipeGallery';

import formatYouTubeUrl from '~/util/formatYouTubeUrl';
import Play from '~/static/images/play';
import share from '~/static/images/share';
import facebook from '~/static/images/facebook-f';
import telegram from '~/static/images/telegram-plane';

const VideoCategories = ({ categories }) => {
  function getThumbnailContent(item) {
    return (
      <>
        <div
          className="video-category__thumbnail bg-cover pos-relative"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        >
          <Play />
        </div>
        <p className="video-category__duration">{item.duration}</p>
        <h4 className="video-category__name">{item.name}</h4>
      </>
    );
  }

  return (
    <div className="container">
      {categories.map((category, i) => {
        const { nodes } = category.videos;
        if (nodes.length) {
          const options = {
            shareEl: false,
            galleryUID: i + 1,
            bgOpacity: 0.75,
          };
          const categoryItems = nodes.slice(0, 4).map((video) => {
            const { zmVideoACF, title, excerpt, date } = video;
            const { videoUrl, videoCover, duration } = zmVideoACF;
            const pubDate = new Date(date);
            return {
              html: `
            <div class="video-category__iframe">
              <iframe src="${formatYouTubeUrl(
                videoUrl
              )}" frameborder="0"></iframe>
              <div class="video-category__info tx-white">
                <h3>${title}</h3>
                <div>${excerpt}</div>
                <div class="row">
                  <div class="col-6">
                    <div>${moment(pubDate).format('DD MMMM YYYY HH:mm')}</div>
                  </div>
                  <div class="col-6">
                    <ul class="list-unstyled d-flex justify-content-end">
                      <li>${share}</li>
                      <li>${facebook}</li>
                      <li>${telegram}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            `,
              thumbnail: videoCover.mediaItemUrl,
              name: title,
              duration,
            };
          });
          return (
            <div key={i} className="row video-category">
              <div className="col-6">
                <p className="video-category__title">{category.name}</p>
              </div>
              <div className="col-6 text-right tx-green">
                <Link href="/category/культура">
                  <a className="video-category__watch-all">Дивись Усі</a>
                </Link>
              </div>
              <PhotoSwipeGallery
                className="col-12"
                items={categoryItems}
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

VideoCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      videos: PropTypes.object,
    })
  ),
};

export default VideoCategories;
