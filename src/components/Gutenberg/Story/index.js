import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';

import Slick from '~/components/Slick';

const Story = ({ block, className = '' }) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const array = block.innerBlocks[0].attributes.images;
    /* eslint-disable */
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

    const temp = [];
    dateToObject.forEach((item) => {
      temp.push({
        url: item.url,
        caption: item.caption,
        alt: item.id,
      });
    });
    setPictures(temp);
  }, []);

  return (
    <div className="content__posts gutenberg__story">
      <Slick images={pictures} type={'story'} />
    </div>
  );
};

export default Story;
