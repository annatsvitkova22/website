import React from 'react';
import * as classnames from 'classnames';

import ArticleTitle from '~/components/Article/Title';
import ArticleList from '~/components/Article/List';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleOpportunities = ({ post, children, className }) => {
  return (
    <article
      className={classnames('article--opportunities', className)}
      key={post.id}
    >
      <div className="article__wrapper">
        <ArticleFeatured
          className="article__image"
          image={post.featuredImage}
          alt={post.title}
          slug={post.slug}
        />
        <div className="article__main">
          <ArticleTitle post={post} className="article__title" />
          <ArticleList post={post} className="article__list" />
        </div>
      </div>
      {children}
    </article>
  );
};

export default ArticleOpportunities;
