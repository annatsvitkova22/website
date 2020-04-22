import React from 'react';
import PropTypes from 'prop-types';

const FeaturedImage = ({ data }) => {
  return (
    <>
      {data && (
        <figure className={'feature__image col-lg-12'}>
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
};

export default FeaturedImage;
