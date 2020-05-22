import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';

import PhotoSwipeWrapper from '~/components/PhotoSwipeWrapper';
import Icons from '~/components/Icons';

const FeaturedImage = ({ data, className, size }) => {
  const imageRef = useRef(false);

  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [options] = useState({
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 1,
  });

  const handleOpen = () => {
    // const rect = imageRef.current.getBoundingClientRect();
    // setPosition({ x: rect.left, y: rect.top });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const img = [
    {
      html: `
      <div class="news-pswp">
        <div class="news-pswp__wrap-img">
          <img class="news-pswp__img" src="${data.mediaItemUrl}" alt="${data.caption}"/>
        </div>
        <p class="news-pswp__caption tx-family-titles">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, unde.</p>
      </div>
  `,
    },
  ];

  return (
    <>
      {data && (
        <figure
          className={classnames('feature__image', className, {
            'col-lg-11': size !== 'full' && 'half',
            'feature__image--full': size === 'full',
            'feature__image--half': size === 'half',
          })}
        >
          <img ref={imageRef} src={data.mediaItemUrl} alt={data.title} />
          <PhotoSwipeWrapper
            options={options}
            items={img}
            isOpen={isOpen}
            onClose={handleClose}
            className="gutenberg__image-pswp"
          />
          {size !== 'full' && (
            <button className={'expand-image'} onClick={handleOpen}>
              <Icons icon={'expand'} />
            </button>
          )}
          {data.caption && size === 'full' && (
            <div className="container">
              <caption
                className={classnames(
                  'feature__image-caption col-lg-6 col-md-8'
                )}
              >
                <span className={'feature__image-author'}>{data.title}</span>
                <span
                  className={'feature__image-description'}
                  dangerouslySetInnerHTML={{ __html: data.caption }}
                />
              </caption>
            </div>
          )}
          {data.caption && size !== 'full' && (
            <caption className={classnames('feature__image-caption')}>
              <span className={'feature__image-author'}>{data.title}</span>
              <span
                className={'feature__image-description'}
                dangerouslySetInnerHTML={{ __html: data.caption }}
              />
            </caption>
          )}
        </figure>
      )}
    </>
  );
};

FeaturedImage.propTypes = {
  data: PropTypes.any,
  className: PropTypes.string,
};

export default FeaturedImage;
