import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PhotoSwipeGallery from '../PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '../PhotoSwipeGallery/videoGalleryUtils';

const VideoCategories = ({ categories }) => (
  <>
    {categories.map((category, i) => {
      const { nodes } = category.videos;
      if (nodes.length) {
        return (
          <div key={i} className="container video-category">
            <div className="row line-height-1 video-category__top-row">
              <div className="col-6">
                <h6 className="video-category__title text-uppercase tx-family-alt">
                  {category.name}
                </h6>
              </div>
              <div className="col-6 text-right tx-green">
                <Link
                  href={`/videos/category/[slug]`}
                  as={`/videos/category/${category.slug}`}
                >
                  <a
                    href={`video/category/${category.slug}`}
                    className="tx-family-titles font-weight-semibold"
                  >
                    Дивись Усі
                  </a>
                </Link>
              </div>
            </div>
            <div className="row">
              <PhotoSwipeGallery
                className="col-12"
                items={prepareGalleryItems(nodes, 4)}
                options={options(i)}
                thumbnailContent={getThumbnailVideo}
              />
            </div>
          </div>
        );
      }
      return '';
    })}
  </>
);
VideoCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      videos: PropTypes.object,
    })
  ),
};

export default VideoCategories;
