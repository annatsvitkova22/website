import React from 'react';
import PropTypes from 'prop-types';

const Gallery = ({ block }) => {
  const array = block.attributes.images;
  const reg = /[\[\]\{\}\\]/gm;
  const regTwo = /\,/gm;
  const anotherreg = /(^.*:")/gm;
  const newArr = array.replace(reg, '').replace(regTwo, ' ').split(' ');
  const chunk = newArr.length / 7;
  const splitArr = (arr, chunks) =>
    arr.reduce(
      // eslint-disable-next-line no-return-assign
      (acc, n, i) => ((acc[i % chunks] = acc[i % chunks] || []).push(n), acc),
      []
    );
  const arr = splitArr(newArr, chunk);
  console.log(arr);
  const newData = arr.map((item) => {
    return item.map((element) =>
      element.replace(anotherreg, '').replace('"', '')
    );
  });

  return <div dangerouslySetInnerHTML={{ __html: block.saveContent }} />;
};
Gallery.propTypes = {
  block: PropTypes.any,
};

export default Gallery;
