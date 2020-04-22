import React, { useContext } from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';
import ArticleContext from '~/components/Article/Context';

const ArticleTitle = ({ post, className }) => {
  const postType = useContext(ArticleContext);
  return (
    <h2 className={classnames('article-title', className)}>
      <Link href={`/${postType}/[slug]`} as={`/${postType}/${post.slug}`}>
        <a className="article-title__link" href={`/${postType}/${post.slug}`}>
          {post.title}
        </a>
      </Link>
    </h2>
  );
};

export default ArticleTitle;
