import React from 'react';

import './styles.scss';
import Slick from '~/components/Slick';

const images = [
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
];

const Story = () => {
  return (
    <div className="content__posts gutenberg__story">
      <Slick images={images} type={'story'} />
    </div>
  );
};

export default Story;
