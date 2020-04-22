import React from 'react';
import * as classnames from 'classnames';

import ArticleAuthor from '~/components/Article/Author';
import ArticleComments from '~/components/Article/Comments';
import ArticleTitle from '~/components/Article/Title';
import ArticleTaxonomies from '~/components/Article/Categories';
import ArticleDate from '~/components/Article/Date';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleNews = ({ post, children, className }) => {
  return (
    <article className={classnames('article--news', className)}>
      <div className="article__wrapper">
        <div className="article__chronology">
          <ArticleDate className="article__time" date={post.date} />
        </div>
        <div className="article__main">
          <ArticleTaxonomies
            categories={post.categories}
            className="article__category"
          />
          <ArticleTitle post={post} className="article__title" />
          <div className="article__meta">
            <ArticleAuthor className="article__author" author={post.author} />
            <ArticleComments
              className="article__comments"
              comments={post.comments}
              slug={post.slug}
            />
          </div>
        </div>
        <ArticleFeatured
          className="article__image"
          image={post.featuredImage}
          alt={post.title}
          slug={post.slug}
        />
      </div>
      {children}
    </article>
  );
};

export default ArticleNews;
