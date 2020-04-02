import React from 'react';
import PropTypes from 'prop-types';

const Gallery = ({ block }) => {
  const array = block.attributes.images;
  const reg = /[\[\]\{\}\\]/gm;
  const regTwo = /\,/gm;
  const newArr = array.replace(reg, '').replace(regTwo, ' ').split(' ');
  const chunk = newArr.length / 6;
  const splitArr = (arr, chunks) =>
    arr.reduce(
      (acc, n, i) => ((acc[i % chunks] = acc[i % chunks] || []).push(n), acc),
      []
    );
  splitArr(newArr, chunk);

  return <div>Gallery</div>;
};
Gallery.propTypes = {
  block: PropTypes.any,
};

export default Gallery;
