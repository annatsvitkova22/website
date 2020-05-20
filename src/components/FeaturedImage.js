import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';

import PhotoSwipeWrapper from '~/components/PhotoSwipeWrapper';
import Icons from '~/components/Icons';

const FeaturedImage = ({ data, className, size }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const img = [{ src: data.mediaItemUrl, title: data.caption, w: 800, h: 600 }];
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
          <img src={data.mediaItemUrl} alt={data.title} />
          <PhotoSwipeWrapper
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
