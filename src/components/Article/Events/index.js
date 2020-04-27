import React from 'react';
import * as classnames from 'classnames';

import ArticleTitle from '~/components/Article/Title';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleEvents = ({ post, children, className }) => {
  return (
    <article className={classnames('article--events', className)} key={post.id}>
      <div className="article__wrapper">
        <ArticleFeatured
          className="article__image"
          image={post.featuredImage}
          alt={post.title}
          slug={post.slug}
        />
        <div className="article__main">
          <ArticleTitle post={post} className="article__title" />
        </div>
      </div>
      {children}
    </article>
  );
};

export default ArticleEvents;
