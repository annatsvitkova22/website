import React from 'react';
import Link from 'next/link';

import Taxonomies from '~/components/Article/Taxonomies';
import Author from '~/components/Article/Author';

const HeroPublication = ({
  categories,
  title,
  slug,
  author,
  featuredImage,
  ...other
}) => {
  const imageUrl = featuredImage.frontHeroImage
    ? featuredImage.frontHeroImage
    : featuredImage.mediaItemUrl;
  return (
    <div className="hero__container pos-relative">
      <Link href={`/publications/[slug]`} as={`/publications/${slug}`}>
        <>
          <a
            href={`/publications/${slug}`}
            className="hero__image d-block"
          >
            <img src={imageUrl} />
          </a>
          <span />
        </>
      </Link>
      <div className="hero__caption tx-white">
        <Taxonomies categories={categories} className={`article__category`} />
        <h2 className="hero__title heading__big">
          <Link href={`/publications/[slug]`} as={`/publications/${slug}`}>
            <a href={`/publications/${slug}`}>{title}</a>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default HeroPublication;
