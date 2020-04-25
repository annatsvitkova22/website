import React from 'react';
import * as classnames from 'classnames';

import ArticleAuthor from '~/components/Article/Author';
import ArticleComments from '~/components/Article/Comments';
import ArticleTitle from '~/components/Article/Title';
import ArticleTaxonomies from '~/components/Article/Taxonomies';
import ArticleDate from '~/components/Article/Date';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleNews = ({ post, children, className, showAuthor = true }) => {
  const {
    date,
    categories,
    comments,
    title,
    slug,
    author,
    featuredImage,
  } = post;
  const showMeta =
    showAuthor || !!(comments && comments.pageInfo && comments.pageInfo.total);
  return (
    <article className={classnames('article--news', className)}>
      <div className="article__wrapper">
        <div className="article__chronology">
          <ArticleDate className="article__time" date={date} />
        </div>
        <div className="article__main">
          <ArticleTaxonomies
            categories={categories}
            className="article__category"
          />
          <ArticleTitle post={post} className="article__title" />
          {showMeta && (
            <div className="article__meta">
              {showAuthor && (
                <ArticleAuthor className="article__author" author={author} />
              )}
              <ArticleComments
                className="article__comments"
                comments={comments}
                slug={slug}
              />
            </div>
          )}
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

export default ArticleNews;
