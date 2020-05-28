import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import Slick from '~/components/Slick';
import PswpWrapperGallery from '~/components/PhotoSwipeWrapper/components/PswpWrapperGallery';

const Gallery = ({ block, className = '' }) => {
  const imageRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    galleryUID: 2,
    closeOnScroll: false,
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false,
    bgOpacity: 1,
  });

  const handleOpen = (itemIndex) => () => {
    // const getThumbBoundsFn = (index) => {
    //   const thumbnail = this.thumbnails[index];
    //   const img = thumbnail.querySelector('.news-pswp');
    //   const pageYScroll =
    //     window.pageYOffset || document.documentElement.scrollTop;
    //   const rect = img.getBoundingClientRect();
    //   return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    // };

    setOptions((prevOpts) => ({
      ...prevOpts,
      index: itemIndex,
      // getThumbBoundsFn,
    }));
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [pictures, setPictures] = useState([]);
  const array = block.attributes.images;
  const reg = /[\[\]\{\}\\]/gm;
  const regTwo = /\,/gm;
  const newArr = array.replace(reg, '').replace(regTwo, ' ').split(' ');

  const dateToArray = _.chunk(newArr, 6).map((item) => {
    return new Map(
      item.map((el) => {
        return el
          .replace(/\"/, '')
          .slice(0, -1)
          .split(/\"\:\"(.+)/);
      })
    );
  });

  const dateToObject = dateToArray.map((item) => {
    return Object.fromEntries(item);
  });

  useEffect(() => {
    const temp = [];
    dateToObject.forEach((item) => {
      temp.push({
        original: item.url,
        thumbnail: item.url,
        description: item.caption,
        originalAlt: item.id,
      });
    });
    setPictures(temp);
  }, []);

  const items = pictures.map((pic) => ({
    thumbUrl: pic.thumbnail,
    html: `
    <div class="news-pswp flex-column flex-lg-row">
      <div class="news-pswp__wrap-img">
        <img class="news-pswp__img" src="${pic.original}" alt="${
      pic.originalAlt
    }"/>
      </div>
      ${
        pic.description
          ? `<div class="news-pswp__caption">
          <p class="news-pswp__caption-inner tx-family-titles">
          ${pic.description}
          </p>
        </div>`
          : ``
      }
      
    </div>
  `,
  }));

  return (
    <>
      <PswpWrapperGallery
        options={options}
        items={items}
        isOpen={isOpen}
        onClose={handleClose}
        className="gutenberg__image-pswp pswp-gallery"
      />
      <div className={`gutenberg__gallery ${className}`}>
        <Slick images={pictures} {...{ handleOpen, imageRef }} />
      </div>
    </>
  );
};
Gallery.propTypes = {
  block: PropTypes.any,
};

export default Gallery;
