import React, { useContext } from 'react';
import * as classnames from 'classnames';
import Link from 'next/link';

import ArticleContext from '~/components/Article/Context';

const ArticleFeatured = ({ image, alt = '', slug, className }) => {
  const postType = useContext(ArticleContext);
  let imageUrl = image;
  if (postType === 'opportunities') {
    if (!image || !image.sourceUrl) return null;
    imageUrl = image.sourceUrl;
  } else {
    if (!image || !image.mediaItemUrl) return null;
    imageUrl = image.mediaItemUrl;
  }
  return (
    <div className={classnames('article-featured', className)}>
      <Link href={`/${postType}/[slug]`} as={`/${postType}/${slug}`}>
        <a className="article-featured__link" href={`/${postType}/${slug}`}>
          <figure className="article-featured__image">
            <img src={imageUrl} alt={alt} />
          </figure>
        </a>
      </Link>
    </div>
  );
};

export default ArticleFeatured;
