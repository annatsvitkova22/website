import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import PhotoSwipeGallery from '~/components/PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '~/components/PhotoSwipeGallery/videoGalleryUtils';
import addVideoDurations from '~/util/addVideoDurations';
import VideoCategoryLoader from '~/components/Loaders/VideoCategoryLoader';

const VideosScene = ({ videos = {}, loading, children }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    const updateVideos = async () => {
      try {
        const updatedVideos = await addVideoDurations(videos.nodes);
        setState(
          <PhotoSwipeGallery
            className="col-12 video-cat-gall"
            items={prepareGalleryItems(updatedVideos)}
            options={options()}
            thumbnailContent={getThumbnailVideo}
            playClass="tx-white"
          />
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (!isEmpty(videos.nodes) && !state) {
      updateVideos();
    }
  }, [videos.nodes, state]);

  if (typeof children === 'object' && !loading) {
    return children;
  }

  if (state === false) {
    return (
      <div className="videos-scene__loader container">
        <div className="row">
          <VideoCategoryLoader
            backgroundColor="#f5f6f7"
            foregroundColor="#eee"
          />
          <VideoCategoryLoader
            backgroundColor="#f5f6f7"
            foregroundColor="#eee"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">{state}</div>
    </div>
  );
};

export default VideosScene;
