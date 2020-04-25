import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';
import PhotoSwipeWrapper from '~/components/PhotoSwipeWrapper';

const Image = ({ block, className = '' }) => {
  const [isActive, setIsActive] = React.useState(false);

  console.log(block.imageAttributes);

  const openPopup = () => {
    setIsActive(setIsOpen(true));
  };
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpen = (index) => {
    setIsOpen(true);
    setIndex(index);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const image = (
    <img
      src={block.imageAttributes.url}
      alt={block.imageAttributes.alt}
      className={block.imageAttributes.className}
    />
  );

  const img = [
    {
      src: block.imageAttributes.url,
      w: block.imageAttributes.width,
      h: block.imageAttributes.height,
      title: 'image 1',
    },
  ];
  if (block.imageAttributes.linkDestination) {
    return (
      <figure className={`gutenberg__image ${className}`}>
        {image}
        <figcaption
          dangerouslySetInnerHTML={{ __html: block.imageAttributes.caption }}
        />
        <PhotoSwipeWrapper items={img} isOpen={isOpen} onClose={handleClose} />
        <button className={'expand-image'} onClick={openPopup}>
          <Icons icon={'expand'} />
        </button>
      </figure>
    );
  }
  if (block.imageAttributes.caption) {
    return (
      <figure className={'gutenberg__image'}>
        {image}
        <figcaption
          dangerouslySetInnerHTML={{ __html: block.imageAttributes.caption }}
        />
      </figure>
    );
  }
  if (block.imageAttributes.href) {
    return (
      <a href={block.imageAttributes.href} target="_blank">
        {image}
      </a>
    );
  }
  return image;
};

Image.propTypes = {
  block: PropTypes.any,
};

export default Image;
