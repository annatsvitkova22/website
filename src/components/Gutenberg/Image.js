import React from 'react';
import PropTypes from 'prop-types';
import { PhotoSwipe } from 'react-photoswipe';

import Icons from '~/components/Icons';

const Image = ({ block }) => {
  const [isActive, setIsActive] = React.useState(false);

  const openPopup = () => {
    setIsActive(!isActive);
  };

  const img = [
    {
      src: block.imageAttributes.url,
      w: 1200,
      h: 900,
      title: 'image 1',
    },
    {
      src: block.imageAttributes.url,
      w: 1200,
      h: 900,
      title: 'image 2',
    },
  ];
  const style = {
    alignSelf: block.imageAttributes.align,
  };
  // TODO: implement all other imageAttributes
  // TODO: if block.imageAttributes.linkDestination === 'media' then open modal with image
  const image = (
    <img
      src={block.imageAttributes.url}
      alt={block.imageAttributes.alt}
      className={block.imageAttributes.className}
      style={style}
    />
  );
  if (block.imageAttributes.linkDestination) {
    return (
      <figure className={'gutenberg__image'}>
        {image}
        <figcaption
          dangerouslySetInnerHTML={{ __html: block.imageAttributes.caption }}
        />
        {isActive && (
          <figure>
            <PhotoSwipe isOpen={isActive} items={img} onClose={openPopup} />
          </figure>
        )}
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
