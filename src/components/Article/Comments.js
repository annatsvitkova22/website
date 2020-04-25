import React, { useContext } from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

import ArticleContext from '~/components/Article/Context';
import Icons from '~/components/Icons';

const ArticleComments = ({ comments, slug, className }) => {
  const postType = useContext(ArticleContext);
  if (!comments || !comments.pageInfo || !comments.pageInfo.total) return null;
  return (
    <Link href={`/${postType}/[slug]`} as={`/${postType}/${slug}?comments=true`}>
      <a
        className={classnames('meta-comments', className)}
        href={`/${postType}/${slug}?comments=true`}
      >
        <Icons icon={'comment-alt'} className="meta-comments__icon" />
        <span className="meta-comments__count">{comments.pageInfo.total}</span>
      </a>
    </Link>
  );
};

export default ArticleComments;
