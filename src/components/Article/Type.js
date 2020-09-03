import React, { useContext } from 'react';
import * as classnames from 'classnames';
import Link from 'next/link';

import ArticleContext from '~/components/Article/Context';
import postTypes from '~/lib/postTypes';

const ArticleType = ({ className }) => {
  const postType = useContext(ArticleContext);
  const postTypeObject = postTypes.find((i) => i.slug === postType);
  if (!postTypeObject) return null;
  return (
    <div
      className={classnames('meta-type', `meta-type--${postType}`, className)}
    >
      <Link href={`/${postType}`}>
        <a className="meta-type__link" href={`/${postType}`}>
          {postTypeObject.name}
        </a>
      </Link>
    </div>
  );
};

export default ArticleType;
