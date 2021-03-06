import React, { useContext } from 'react';
import * as classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Img } from 'react-progressive-loader';

import ArticleContext from '~/components/Article/Context';

const ArticleFeatured = ({ image, alt = '', size, slug, className, modif }) => {
  const postType = useContext(ArticleContext);
  let imageUrl = image;
  if ((postType === 'opportunities' || postType === 'others') && image) {
    imageUrl = image.sourceUrl;
  } else if (image) {
    imageUrl = image.mediaItemUrl;
  }

  if (size && image) {
    if (image.zm_md) imageUrl = image.zm_md;
    imageUrl = image[size] ? image[size] : image.mediaItemUrl;
  }

  if (postType === 'pages') {
    return (
      <div className={classnames('article-featured', className)}>
        <Link href={`/[uri]`} as={`/${slug}`}>
          <a
            className={`article-featured__link ${
              modif ? `article-featured__link--${modif}` : ''
            }`}
            href={`/${slug}`}
          >
            <figure
              className={`article-featured__image
              ${modif ? `article-featured__image--${modif}` : ''}
              ${!imageUrl ? `article-featured__image--empty` : ''}
            `}
            >
              {imageUrl && (
                <Img
                  src={imageUrl}
                  alt={alt}
                  bgColor="#1d9e74"
                  loadOnScreen
                  className="article-featured__loader-wrapper"
                />
              )}
            </figure>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className={classnames('article-featured', className)}>
      <Link href={`/${postType}/[slug]`} as={`/${postType}/${slug}`}>
        <a
          className={`article-featured__link ${
            modif ? `article-featured__link--${modif}` : ''
          }`}
          href={`/${postType}/${slug}`}
        >
          <figure
            className={`article-featured__image
              ${modif ? `article-featured__image--${modif}` : ''}
              ${!imageUrl ? `article-featured__image--empty` : ''}
            `}
          >
            {imageUrl && (
              <Img
                src={imageUrl}
                alt={alt}
                bgColor="#1d9e74"
                loadOnScreen
                className="article-featured__loader-wrapper"
              />
            )}
          </figure>
        </a>
      </Link>
    </div>
  );
};

ArticleFeatured.propTypes = {
  image: PropTypes.any,
  size: PropTypes.string,
  alt: PropTypes.string,
  slug: PropTypes.any,
  className: PropTypes.string,
  modif: PropTypes.any,
};

export default ArticleFeatured;
