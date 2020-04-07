import React from 'react';
import PropTypes from 'prop-types';

const FeaturedImage = ({ data }) => {
  console.log(data);
  return (
    <>
      {data && (
        <figure>
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
