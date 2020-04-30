import React from 'react';
import Link from 'next/link';

import PhotoSwipeGallery from '~/components/PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '~/components/PhotoSwipeGallery/videoGalleryUtils';

const VideosScene = ({ videos }) => (
  <div className="container">
    <div className="row line-height-1 video-category__top-row">
      <div className="col-6">
        <h6 className="video-category__title text-uppercase tx-family-alt">
          Відео
        </h6>
      </div>
      <div className="col-6 text-right tx-green">
        <Link href={`/videos`}>
          <a className="video-category__watch-all tx-family-titles font-weight-semibold">
            Дивись Усі
          </a>
        </Link>
      </div>
    </div>
    <div className="row">
      <PhotoSwipeGallery
        className="col-12 video-cat-gall"
        items={prepareGalleryItems(videos)}
        options={options()}
        thumbnailContent={getThumbnailVideo}
        playClass="tx-white"
      />
    </div>
  </div>
);

export default VideosScene;
