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
      <h6 className="video-category__duration tx-12 font-weight-medium">
        {item.duration}
      </h6>
      <h6 className="video-category__name">{item.name}</h6>
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

const options = (galleryUID = 0) => ({
  shareEl: false,
  galleryUID: galleryUID + 1,
  bgOpacity: 0.75,
});

export { getThumbnailVideo, prepareGalleryItems, options };
