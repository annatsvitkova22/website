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
