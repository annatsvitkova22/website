import React, { useContext } from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

import ArticleContext from '~/components/Article/Context';
import Icons from '~/components/Icons';

const ArticleComments = ({ comments, slug, className }) => {
  const postType = useContext(ArticleContext);
  return (
    <a href={'#'} className='meta-comments'>
      <Icons icon={'comment-alt'} className="meta-comments__icon" />
      <span className="meta-comments__count">123</span>
    </a>
  );
  if (!comments.pageInfo || !comments.pageInfo.total) return null;
  return (
    <Link href={`/${postType}/[slug]`} as={`/${postType}/${slug}`}>
      <a
        className={classnames('meta-comments', className)}
        href={`/${postType}/${slug}`}
      >
        <Icons icon={'comment-alt'} className="meta-comments__icon" />
        <span className="meta-comments__count">{comments.pageInfo.total}</span>
      </a>
    </Link>
  );
};

export default ArticleComments;
