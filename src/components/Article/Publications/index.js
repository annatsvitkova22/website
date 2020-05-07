import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

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
      sizeCol = 'col-lg-6';
      break;
    case 'big':
      sizeCol = 'col-12';
      break;
    case 'small':
      sizeCol = 'col-lg-4';
      break;

    default:
      break;
  }

  return (
    <article
      className={classnames(
        `article--publication art-publ--${style}-${size} ${
          size === 'big' ? 'd-flex flex-column flex-lg-row' : ''
        }`,
        className,
        sizeCol
      )}
    >
      <ArticleFeatured
        modif="publ"
        className={`article__image--publ ${
          size === 'big' ? 'flex-lg-grow-1 w-lg-50' : ''
        }`}
        image={featuredImage}
        alt={title}
        slug={slug}
      />
      <div
        className={`art-publ__wrapper art-publ__wrapper--${style} art-publ__wrapper--${style}-${size}  ${
          size === 'big' ? 'flex-lg-grow-1 w-lg-50' : ''
        }
      ${
        style === 'on' && (size === 'medium' || size === 'small')
          ? 'pos-absolute b-0 l-0 r-0 tx-white'
          : ''
      }
      `}
      >
        <ArticleTaxonomies
          categories={categories}
          className={`article__category art-publ__category--${style}-${size}`}
        />
        <ArticleTitle
          highlightInTitle={highlightInTitle}
          post={post}
          className={`text-capitalize art-publ__title art-publ__title--${style}-${size}`}
        />
        <div className="article__meta">
          <ArticleAuthor className="article__author" author={author} />
        </div>
      </div>
    </article>
  );
};

ArticlePublications.propTypes = {
  post: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.any,
  highlightInTitle: PropTypes.any,
};

export default ArticlePublications;
