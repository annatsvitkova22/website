import React from 'react';
import Link from 'next/link';

const MainPublication = ({
  title,
  uri,
  featuredImage,
  author,
  categories: mainCats,
  slug,
}) => (
  <div className="main-publ pos-relative">
    <Link href={`/publications/${slug}`}>
      <a
        className="main-publ__image d-block bg-cover"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(66, 65, 65, 0) 0%, #2B2B2B 100%), url(${featuredImage.mediaItemUrl})`,
        }}
      >
        <span />
      </a>
    </Link>
    <div className="main-publ__caption tx-white">
      <ul className="main-publ__list list-reset text-left text-sm-center">
        {mainCats.nodes.map(({ name, slug }, i) => (
          <li key={i} className="cat-list__item d-inline-block">
            <Link href={`/search?category=${slug}`}>
              <a className="cat-list__button">{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h1 className="main-publ__title text-left text-sm-center text-capitalize">
        <Link href={`/publications/${slug}`}>
          <a>{title}</a>
        </Link>
      </h1>
      <div className="text-left text-sm-center">
        <Link href={`/blogs/author/${author.slug}`}>
          <a className="text-capitalize text-left text-sm-center tx-family-titles tx-tiny font-weight-bold">
            {author.name}
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default MainPublication;
