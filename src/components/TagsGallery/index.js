import React from 'react';

import PhotoSwipeGallery from '~/components/PhotoSwipe';

const items = [
  {
    html:
      '<iframe src="https://www.youtube.com/embed/JzOnfhE6-1E" frameborder="0"></iframe>',
    thumbnail: 'http://lorempixel.com/312/190/',
    w: 1200,
    h: 900,
    title: 'Video',
  },
];

// let options = {
//   //http://photoswipe.com/documentation/options.html
// };

const getThumbnailContent = (item) => {
  return (
    <div
      className="gallery-thumbnail"
      style={{ backgroundImage: `url(${item.thumbnail})` }}
    />
  );
};

const PhotoGallery = () => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <PhotoSwipeGallery
          items={items}
          // options={options}
          thumbnailContent={getThumbnailContent}
        />
      </div>
    </div>
  </div>
);

export default PhotoGallery;
