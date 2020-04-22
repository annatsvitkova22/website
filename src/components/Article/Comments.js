import React from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

const ArticleComments = ({ comments, className }) => {
  if (!comments.pageInfo || !comments.pageInfo.total) return null;
  return (
    <Link href={'/search'}>
      <a className={classnames('meta-comments', className)} href="/search">
        <span className="meta-comments__icon">icon</span>
        <span className="meta-comments__count">{comments.pageInfo.total}</span>
      </a>
    </Link>
  );
};

export default ArticleComments;
