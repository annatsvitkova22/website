import React, { useContext } from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

import ArticleContext from '~/components/Article/Context';

const ArticleComments = ({ comments, slug, className }) => {
  if (!comments.pageInfo || !comments.pageInfo.total) return null;
  const postType = useContext(ArticleContext);
  return (
    <Link href={`/${postType}/[slug]`} as={`/${postType}/${slug}`}>
      <a
        className={classnames('meta-comments', className)}
        href={`/${postType}/${slug}`}
      >
        <span className="meta-comments__icon">icon</span>
        <span className="meta-comments__count">{comments.pageInfo.total}</span>
      </a>
    </Link>
  );
};

export default ArticleComments;
