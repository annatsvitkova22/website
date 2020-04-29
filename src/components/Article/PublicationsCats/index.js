import React from 'react';

import ArticleAuthor from '~/components/Article/Author';
import ArticleFeatured from '~/components/Article/Featured';
import ArticleTitle from '~/components/Article/Title';

const PublicationsCats = ({
  size,
  index,
  post,
  post: { title, slug, author, featuredImage },
  highlightInTitle,
}) => {
  let colSize = '';
  switch (size) {
    case 'big':
      colSize = index === 0 ? 'col-12' : 'col-md-6';
      break;

    case 'medium':
    case 'small':
      colSize = 'col-12';
      break;

    default:
      break;
  }

  return (
    <div className={colSize}>
      <div className="publ-cat">
        <ArticleFeatured image={featuredImage} alt={title} slug={slug} />
        <div className="publ-cat__wrapper">
          <ArticleTitle
            highlightInTitle={highlightInTitle}
            post={post}
            className="text-capitalize publ-cat__title font-weight-semibold"
          />
          <div className="article__meta">
            <ArticleAuthor className="article__author" author={author} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationsCats;
