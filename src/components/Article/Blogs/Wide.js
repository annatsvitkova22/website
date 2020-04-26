import React from 'react';
import * as classnames from 'classnames';

import ArticleAuthor from '~/components/Article/Author';
import ArticleComments from '~/components/Article/Comments';
import ArticleTitle from '~/components/Article/Title';
import ArticleTaxonomies from '~/components/Article/Taxonomies';
import ArticleDate from '~/components/Article/Date';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleBlogsWide = ({ post, children, className }) => {
  const {
    date,
    categories,
    comments,
    title,
    slug,
    author,
    featuredImage,
  } = post;
  return (
    <article className={classnames('article--blogs', className)}>
      <div className="article__wrapper">
        <div className="article__chronology">
          <ArticleDate className="article__time" date={date} />
        </div>
        <div className="article__main">
          <div className="article__top">
            <ArticleDate className="article__time" date={post.date} />
            <ArticleTaxonomies
              categories={categories}
              className="category-label"
            />
          </div>
          <ArticleTitle post={post} className="article__title" />
          <div className="article__meta">
            <ArticleAuthor className="article__author" author={author} />
            <ArticleComments
              className="article__comments"
              comments={comments}
              slug={slug}
            />
          </div>
        </div>
        <ArticleFeatured
          className="article__image"
          image={featuredImage}
          alt={title}
          slug={slug}
        />
      </div>
      {children}
    </article>
  );
};

export default ArticleBlogsWide;
