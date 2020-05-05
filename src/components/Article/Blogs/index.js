import React from 'react';
import * as classnames from 'classnames';

import ArticleAuthor from '~/components/Article/Author';
import ArticleTitle from '~/components/Article/Title';
import ArticleTaxonomies from '~/components/Article/Taxonomies';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleBlogs = ({ post, children, className, highlightInTitle }) => {
  const { categories, title, slug, author, featuredImage } = post;
  return (
    <article className={classnames('article--blog', className)}>
      <ArticleFeatured
        className="article__image"
        image={featuredImage}
        alt={title}
        slug={slug}
      />
      <div className="article__main">
        <ArticleTaxonomies
          categories={categories}
          className="article__category"
        />
        <ArticleTitle
          highlightInTitle={highlightInTitle}
          post={post}
          className="article__title"
        />
        <div className="article__meta">
          <ArticleAuthor
            className="article__author meta-author--grey"
            author={author}
          />
        </div>
      </div>
      {children}
    </article>
  );
};

export default ArticleBlogs;
