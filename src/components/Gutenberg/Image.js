import React from 'react';
import PropTypes from 'prop-types';
import { PhotoSwipe } from 'react-photoswipe';

import Icons from '~/components/Icons';

const Image = ({ block, className = '' }) => {
  const [isActive, setIsActive] = React.useState(false);

  console.log(block);

  const openPopup = () => {
    setIsActive(!isActive);
  };

  const img = [
    {
      src: block.attributes.url,
      w: 1200,
      h: 900,
      title: 'image 1',
    },
    {
      src: block.attributes.url,
      w: 1200,
      h: 900,
      title: 'image 2',
    },
  ];
  const style = {
    alignSelf: block.attributes.align,
  };
  // TODO: implement all other attributes
  // TODO: if block.attributes.linkDestination === 'media' then open modal with image
  const image = (
    <img
      src={block.attributes.url}
      alt={block.attributes.alt}
      className={block.attributes.className}
      style={style}
    />
  );
  if (block.attributes.linkDestination) {
    return (
      <figure className={`gutenberg__image ${className}`}>
        {image}
        <figcaption
          dangerouslySetInnerHTML={{ __html: block.attributes.caption }}
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
  if (block.attributes.caption) {
    return (
      <figure className={'gutenberg__image'}>
        {image}
        <figcaption
          dangerouslySetInnerHTML={{ __html: block.attributes.caption }}
        />
      </figure>
    );
  }
  if (block.attributes.href) {
    return (
      <a href={block.attributes.href} target="_blank">
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
