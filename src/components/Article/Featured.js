import React, { useContext } from 'react';
import * as classnames from 'classnames';
import ArticleContext from '~/components/Article/Context';
import Link from 'next/link';

const ArticleFeatured = ({ image, alt = '', slug, className }) => {
  if (!image || !image.mediaItemUrl) return null;
  const postType = useContext(ArticleContext);
  return (
    <div className={classnames('article-featured', className)}>
      <Link href={`/${postType}/[slug]`} as={`/${postType}/${slug}`}>
        <a className="article-featured__link" href={`/${postType}/${slug}`}>
          <figure className="article-featured__image">
            <img src={image.mediaItemUrl} alt={alt} />
          </figure>
        </a>
      </Link>
    </div>
  );
};

export default ArticleFeatured;
