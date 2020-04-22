import React from 'react';
import * as classnames from 'classnames';

const ArticleFeatured = ({ image, alt = '', className }) => {
  if (!image || !image.mediaItemUrl) return null;
  return (
    <figure className={classnames('article-featured', className)}>
      <img src={image.mediaItemUrl} alt={alt} />
    </figure>
  );
};

export default ArticleFeatured;
