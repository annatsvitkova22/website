import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

import ArticleAuthor from '~/components/Article/Author';
import ArticleTitle from '~/components/Article/Title';
import ArticleTaxonomies from '~/components/Article/Taxonomies';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleBlogs = ({
  post,
  children,
  className,
  imageSize,
  isHighlightInTitle: highlightInTitle,
}) => {
  const { categories, title, slug, author, featuredImage } = post;
  return (
    <article className={classnames('article--blog', className)}>
      <ArticleFeatured
        className="article__image"
        size={imageSize}
        image={featuredImage}
        alt={title}
        slug={slug}
      />
      <div className="article__main">
        <ArticleTaxonomies
          categories={categories}
          className="article__category mt-l--small"
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

ArticleBlogs.propTypes = {
  post: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  imageSize: PropTypes.string,
  isHighlightInTitle: PropTypes.bool,
};

export default ArticleBlogs;
