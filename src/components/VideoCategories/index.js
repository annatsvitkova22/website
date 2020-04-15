import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PhotoSwipeGallery from '../PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '../PhotoSwipeGallery/videoGalleryUtils';

const VideoCategories = ({ categories }) => {
  return (
    <div className="container">
      {categories.map((category, i) => {
        const { nodes } = category.videos;
        if (nodes.length) {
          return (
            <div key={i} className="row video-category">
              <div className="col-6">
                <p className="video-category__title">{category.name}</p>
              </div>
              <div className="col-6 text-right tx-green">
                <Link href={`/category/${category.slug}`}>
                  <a className="video-category__watch-all">Дивись Усі</a>
                </Link>
              </div>
              <PhotoSwipeGallery
                className="col-12"
                items={prepareGalleryItems(nodes, 4)}
                options={options(i)}
                thumbnailContent={getThumbnailVideo}
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
