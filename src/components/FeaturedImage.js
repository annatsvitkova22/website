import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';

const FeaturedImage = ({ data, className, size }) => {
  return (
    <>
      {data && (
        <figure
          className={classnames('feature__image', className, {
            'col-lg-11': size !== 'full',
            'feature__image--full': size === 'full',
          })}
        >
          <img src={data.mediaItemUrl} alt={data.title} />
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
