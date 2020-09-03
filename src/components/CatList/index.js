import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const CatList = ({ categories, currCatId }) => (
  <ul className="list-reset cat-list">
    {categories.map((category) => {
      const { categoryId, slug, name, videos } = category;
      if (videos.nodes.length !== 0) {
        return (
          <li className="cat-list__item d-inline-block" key={categoryId}>
            <Link
              href={`/videos/category/[slug]`}
              as={`/videos/category/${slug}`}
            >
              <a
                href={`video/category/${slug}`}
                className={`cat-list__button d-inline-block font-weight-bold tx-family-alt ${
                  currCatId === categoryId ? 'cat-list__button--active' : ''
                }`}
              >
                {name}
              </a>
            </Link>
          </li>
        );
      }
      return '';
    })}
  </ul>
);

CatList.propTypes = {
  categories: PropTypes.object,
  currCatId: PropTypes.number,
};

export default CatList;
