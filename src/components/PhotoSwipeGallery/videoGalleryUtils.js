import React from 'react';
import moment from 'moment';
import 'moment/locale/uk';

import Play from '~/static/images/play';
import formatYouTubeUrl from '~/util/formatYouTubeUrl';
import share from '~/static/images/share';
import facebook from '~/static/images/facebook-f';
import telegram from '~/static/images/telegram-plane';

const getThumbnailVideo = (item) => {
  return (
    <>
      <div
        className="video-category__thumbnail bg-cover pos-relative"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      >
        <Play />
      </div>
      <h6 className="video-category__duration tx-tiny font-weight-medium">
        {item.duration}
      </h6>
      <h4 className="video-category__name text-capitalize">{item.name}</h4>
    </>
  );
};

const prepareGalleryItems = (videos, quantity = videos.length) =>
  videos.slice(0, quantity).map((video) => {
    const { zmVideoACF, title, excerpt, date } = video;
    const { videoUrl, videoCover, duration } = zmVideoACF;
    const pubDate = new Date(date);
    return {
      html: `
            <div class="video-category__iframe">
              <div class="video-category__wrapper">
                <img src="/assets/videos/video-sizer.png" alt="Video sizer"/>
                <iframe src="${formatYouTubeUrl(
                  videoUrl
                )}" frameborder="0"></iframe>
              </div>
              <div class="video-category__info tx-white">
                <h3 class="video-popup__title">${title}</h3>
                <div class="video-popup__excerpt tx-small">${excerpt}</div>
                <div class="row">
                  <div class="col-6">
                    <time class="tx-tiny font-weight-bold tx-family-titles"
                    datetime="${moment(pubDate).format()}">
                      ${moment(pubDate).format('DD MMMM YYYY HH:mm')}
                    </time>
                  </div>
                  <div class="col-6">
                    <ul class="share-list list-unstyled d-flex justify-content-end">
                      <li class="share-list__item">${share}</li>
                      <li class="share-list__item">${facebook}</li>
                      <li class="share-list__item">${telegram}</li>
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

const options = (galleryUID = 0) => ({
  fullscreenEl: false,
  shareEl: false,
  galleryUID: galleryUID + 1,
  bgOpacity: 0.75,
});

export { getThumbnailVideo, prepareGalleryItems, options };
