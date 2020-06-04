import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icons from '~/components/Icons';
import PhotoSwipeWrapper from '~/components/PhotoSwipeWrapper';

const Image = ({ block, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const imgAlign = classNames({
    'img-wrapper': true,
    'img--rt': block.attributes.align === 'right',
    'img--lt': block.attributes.align === 'left',
    'img--ct': block.attributes.align === 'center',
  });
  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const image = (
    <img
      src={block.imageAttributes.url}
      alt={block.imageAttributes.alt}
      className={block.imageAttributes.className}
      maxHeight={block.imageAttributes.height}
      width={block.imageAttributes.width}
    />
  );

  const img = [
    {
      html: `
      <div class="news-pswp flex-column flex-lg-row">
        <div class="news-pswp__wrap-img">
          <img class="news-pswp__img" src="${block.imageAttributes.url}" alt="${
        block.imageAttributes.caption
      }"/>
        </div>
        ${
          block.imageAttributes.caption
            ? `<div class="news-pswp__caption">
            <p class="news-pswp__caption-inner tx-family-titles">
            ${block.imageAttributes.caption}
            </p>
          </div>`
            : ``
        }
        
      </div>
  `,
    },
  ];

  if (block.imageAttributes.linkDestination) {
    return (
      <div className={`gutenberg__image ${className}`}>
        <figure className={imgAlign} style={{}}>
          {image}
          <figcaption
            dangerouslySetInnerHTML={{ __html: block.imageAttributes.caption }}
          />
          <PhotoSwipeWrapper
            items={img}
            isOpen={isOpen}
            onClose={handleClose}
            className="gutenberg__image-pswp"
          />
          <div className="gutenberg__image-expand" onClick={handleOpen}>
            <button className={'expand-image'}>
              <Icons icon={'expand'} />
            </button>
          </div>
        </figure>
      </div>
    );
  }
  if (block.imageAttributes.caption) {
    return (
      <div className={`gutenberg__image ${className}`}>
        <figure>
          {image}
          <figcaption
            dangerouslySetInnerHTML={{ __html: block.imageAttributes.caption }}
          />
          <PhotoSwipeWrapper
            items={img}
            isOpen={isOpen}
            onClose={handleClose}
            className="gutenberg__image-pswp"
          />
          <button className={'expand-image'} onClick={handleOpen}>
            <Icons icon={'expand'} />
          </button>
        </figure>
      </div>
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
