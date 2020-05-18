import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import ImageGallery from 'react-image-gallery';

const Gallery = ({ block }) => {
  const [pictures, setPictures] = useState([]);
  console.log(block);
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
  console.log(dateToObject);

  console.log(pictures);
  return (
    <div>
      <ImageGallery items={pictures} />
    </div>
  );
};
Gallery.propTypes = {
  block: PropTypes.any,
};

export default Gallery;
