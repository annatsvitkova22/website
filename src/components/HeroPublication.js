import React from 'react';
import Link from 'next/link';

import Taxonomies from '~/components/Article/Taxonomies';
import Author from '~/components/Article/Author';

const HeroPublication = ({
  categories,
  title,
  slug,
  author,
  featuredImage: { mediaItemUrl },
}) => (
  <div className="hero__container pos-relative">
    <Link href={`/publications/[slug]`} as={`/publications/${slug}`}>
      <a
        href={`/publications/${slug}`}
        className="hero__image bg-cover d-block"
        style={{
          backgroundImage: `url(${mediaItemUrl})`,
        }}
      >
        <span />
      </a>
    </Link>
    <div className="hero__caption tx-white">
      <Taxonomies categories={categories} className={`article__category`} />
      <h1 className="hero__title heading__big">
        <Link href={`/publications/[slug]`} as={`/publications/${slug}`}>
          <a href={`/publications/${slug}`}>{title}</a>
        </Link>
      </h1>
      <div className="article__meta">
        <Author className="article__author" author={author} />
      </div>
    </div>
  </div>
);

export default HeroPublication;
