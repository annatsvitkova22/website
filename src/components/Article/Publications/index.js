import React from 'react';
import * as classnames from 'classnames';

import ArticleAuthor from '~/components/Article/Author';
import ArticleTitle from '~/components/Article/Title';
import ArticleTaxonomies from '~/components/Article/Taxonomies';
import ArticleFeatured from '~/components/Article/Featured';

const ArticlePublications = ({
  post,
  post: {
    categories,
    title,
    slug,
    author,
    featuredImage,
    zmPublicationsACF: { size, style },
  },
  children,
  className,
  highlightInTitle,
}) => {
  let sizeCol = '';

  switch (size) {
    case 'medium':
      sizeCol = 'col-md-6';
      break;
    case 'big':
      sizeCol = 'col-12';
      break;
    case 'small':
      sizeCol = 'col-md-4';
      break;

    default:
      break;
  }

  return (
    <article
      className={classnames(
        `article--publication art-publ--${style} ${
          size === 'big' ? 'd-flex' : ''
        }`,
        className,
        sizeCol
      )}
    >
      <ArticleFeatured
        modif="publ"
        className={`article__image article__image--publ ${
          size === 'big' ? 'flex-fill' : ''
        }`}
        image={featuredImage}
        alt={title}
        slug={slug}
      />
      <div className={`${size === 'big' ? 'flex-fill' : ''}`}>
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
          <ArticleAuthor className="article__author" author={author} />
        </div>
      </div>
    </article>
  );
};

export default ArticlePublications;
