import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import objectToGetParams from '~/util/objectToGetParams';

import PhotoSwipeGallery from '../PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '../PhotoSwipeGallery/videoGalleryUtils';

const VideoCategories = ({ categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (window) {
      document.addEventListener('click', handleClickOnShare);
    }

    return () => {
      document.removeEventListener('click', handleClickOnShare);
    };
  }, []);

  const handleClickOnShare = (event) => {
    const path =
      event.target && event.target.parentNode
        ? event.target.parentNode.parentNode.classList.value
        : null;
    const svg =
      event.target && event.target.parentNode
        ? event.target.parentNode.classList.value
        : null;
    event.preventDefault();
    if (path === 'video-share__copy' || svg === 'video-share__copy') {
      setIsModalOpen(true);
    }
    if (path === 'video-share__facebook' || svg === 'video-share__facebook') {
      const facebookLink = (url) => {
        return (
          'https://www.facebook.com/sharer/sharer.php' +
          objectToGetParams({
            u: url,
          })
        );
      };
      const link = facebookLink(window.location.href);

      window.open(link, '_blank');
    }
    if (path === 'video-share__telegram') {
      const telegramLink = (url) => {
        return (
          'https://telegram.me/share/' +
          objectToGetParams({
            url,
          })
        );
      };
      const link = telegramLink(window.location.href);
      window.open(link, '_blank');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
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
                      className="tx-family-titles font-weight-semibold video-category__watch-all"
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
                  isModalOpen={isModalOpen}
                  handleModalClose={handleModalClose}
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
};
VideoCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      videos: PropTypes.object,
    })
  ),
};

export default VideoCategories;
