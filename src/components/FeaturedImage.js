import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';

const FeaturedImage = ({ data, className }) => {
  return (
    <>
      {data && (
        <figure className={classnames('feature__image col-lg-11', className)}>
          <img src={data.mediaItemUrl} alt={data.title} />
          <caption className={'feature__image-caption'}>
            <span className={'feature__image-author'}>{data.title}</span>
            <span
              className={'feature__image-description'}
              dangerouslySetInnerHTML={{ __html: data.caption }}
            />
          </caption>
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
