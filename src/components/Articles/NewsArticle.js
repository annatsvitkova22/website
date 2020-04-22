import React from 'react';

import ArticleAuthor from '~/components/Articles/Author';
import ArticleComments from '~/components/Articles/Comments';
import ArticleTitle from '~/components/Articles/Title';
import ArticleTaxonomies from '~/components/Articles/Categories';
import ArticleDate from '~/components/Articles/Date';
import ArticleFeatured from '~/components/Articles/Featured';

const NewsArticle = ({ post, children }) => {
  return (
    <article className="news-article">
      <div className="news-article__wrapper">
        <div className="news-article__chronology">
          <ArticleDate className="news-article__time" date={post.date} />
        </div>
        <div className="news-article__main">
          <ArticleTaxonomies
            categories={post.categories}
            className="news-article__category"
          />
          <ArticleTitle post={post} className="news-article__title" />
          <div className="news-article__meta">
            <ArticleAuthor
              className="news-article__author"
              author={post.author}
            />
            <ArticleComments
              className="news-article__comments"
              comments={post.comments}
            />
          </div>
        </div>
        <ArticleFeatured
          className="news-article__image"
          image={post.featuredImage}
          alt={post.title}
        />
      </div>
      {children}
    </article>
  );
};

export default NewsArticle;
