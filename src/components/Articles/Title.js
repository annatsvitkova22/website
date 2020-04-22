import React from 'react';
import Link from 'next/link';
import * as classnames from 'classnames';

const ArticleTitle = ({ post, className }) => {
  return (
    <h2 className={classnames('article-title', className)}>
      <Link href="/news/[slug]" as={`/news/${post.slug}`}>
        <a className="article-title__link" href={`/news/${post.slug}`}>
          {post.title}
        </a>
      </Link>
    </h2>
  );
};

export default ArticleTitle;
