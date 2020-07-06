import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ArticleAuthor from '~/components/Article/Author';
import Taxonomies from '~/components/Article/Taxonomies';

const MainPublication = ({
  title,
  featuredImage,
  author,
  categories: mainCats,
  slug,
}) => {
  return (
    <div className="main-publ pos-relative">
      <Link href="/publications/[slug]" as={`/publications/${slug}`}>
        <a
          className="main-publ__image d-block bg-cover"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(66, 65, 65, 0) 0%, #2B2B2B 100%), url(${featuredImage.mediaItemUrl})`,
          }}
          href={`/publications/${slug}`}
        >
          <span />
        </a>
      </Link>
      <div className="main-publ__caption tx-white">
        <div className="main-publ__caption-container">
          <div className="d-flex">
            <Taxonomies categories={mainCats} className="cat-list__button" />
          </div>
          <h1 className="main-publ__title text-left text-capitalize">
            <Link href={`/publications/${slug}`}>
              <a>{title}</a>
            </Link>
          </h1>
          <div className="text-left">
            <ArticleAuthor
              className="text-capitalize text-left text-sm-center tx-family-titles tx-tiny font-weight-bold"
              author={author}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

MainPublication.propTypes = {
  title: PropTypes.string,
  featuredImage: PropTypes.object,
  author: PropTypes.object,
  categories: PropTypes.any,
  slug: PropTypes.any,
};
export default MainPublication;
