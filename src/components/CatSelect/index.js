import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';

import Times from '~/static/images/times';

const CatSelect = ({ categories, currCatId, router }) => {
  function onChange(e) {
    router.replace(`/videos/category/${e.target.value}`);
  }

  return (
    <div className="pos-relative cat-select">
      <label
        htmlFor="cat-select"
        className="cat-select__label pos-absolute pos-center-left text-uppercase heading-huge tx-family-titles font-weight-bold"
      >
        !
      </label>
      <select
        id="cat-select"
        name="cat-select"
        className="cat-select__main w-100 tx-white text-uppercase heading-huge tx-family-titles font-weight-bold"
        onChange={onChange}
      >
        {categories.map((category) => {
          const { categoryId, slug, name, videos } = category;
          if (videos.nodes.length !== 0) {
            return (
              <option
                key={categoryId}
                value={slug}
                selected={currCatId === categoryId}
              >
                {name}
              </option>
            );
          }
          return '';
        })}
      </select>
      <Link href="/videos">
        <a className="cat-page__back line-height-1 pos-absolute pos-center-right">
          <Times />
        </a>
      </Link>
    </div>
  );
};

CatSelect.propTypes = {
  categories: PropTypes.object,
  currCatId: PropTypes.number,
  router: PropTypes.object,
};

export default withRouter(CatSelect);
