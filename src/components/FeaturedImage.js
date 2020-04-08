import React from 'react';
import PropTypes from 'prop-types';

const FeaturedImage = ({ data }) => {
  return (
    <>
      {data && (
        <figure className={'feature__image col-10'}>
          <img src={data.mediaItemUrl} alt={data.title} />
          <caption>
            {data.author.name} {data.author.description}
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
