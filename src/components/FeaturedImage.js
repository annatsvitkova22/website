import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';

import PhotoSwipeWrapper from '~/components/PhotoSwipeWrapper';
import Icons from '~/components/Icons';

const FeaturedImage = ({ data, className, size, ...settings }) => {
  const imageRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [options] = useState({
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false,
    bgOpacity: 1,
    arrowEl: false,
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const img = [
    {
      html: `
      <div class="news-pswp flex-column flex-lg-row">
        <div class="news-pswp__wrap-img">
          <img class="news-pswp__img" src="${
            data ? data.mediaItemUrl : ''
          }" alt="${data ? data.caption : ''}"/>
        </div>
        ${
          data && data.caption
            ? `<div class="news-pswp__caption">
            <p class="news-pswp__caption-inner tx-family-titles">
            ${data.caption}
            </p>
          </div>`
            : ``
        }

      </div>
  `,
    },
  ];
  return (
    <>
      {data && size === 'full' && (
        <div
          className={classnames('feature__image', className, {
            'feature__image--full': size === 'full',
          })}
          style={{
            backgroundImage: `url(${data.mediaItemUrl})`,
            backgroundPosition: settings.position
              ? settings.position
              : 'center',
          }}
        >
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
        </div>
      )}
      {data && size !== 'full' && settings.type === 'Publication' && (
        <div
          className="feature__image feature__image--background"
          style={{
            backgroundImage: `url(${data.mediaItemUrl})`,
            backgroundPosition: settings.position
              ? settings.position
              : 'center',
          }}
        >
          <PhotoSwipeWrapper
            options={options}
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
        </div>
      )}
      {data && size !== 'full' && settings.type !== 'Publication' && (
        <figure
          className={classnames('feature__image', className, {
            'feature__image--full': size === 'full',
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
            <div className="gutenberg__image-expand" onClick={handleOpen}>
              <button className={'expand-image'}>
                <Icons icon={'expand'} />
              </button>
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
