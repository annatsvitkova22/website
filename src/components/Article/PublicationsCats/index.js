import React from 'react';
import PropTypes from 'prop-types';

import ArticleAuthor from '~/components/Article/Author';
import ArticleFeatured from '~/components/Article/Featured';
import ArticleTitle from '~/components/Article/Title';

const PublicationsCats = ({
  size,
  isFirst,
  post,
  post: { title, slug, author, featuredImage },
  highlightInTitle,
}) => {
  let colSize = '';
  let titleModificator = '';
  let imageSize = '';
  switch (size) {
    case 'big':
      colSize = isFirst ? 'col-12' : 'col-xl-6';
      titleModificator = isFirst ? 'big-long' : 'big-short';
      imageSize = isFirst ? 'zm_md' : 'zm_xs';
      break;

    case 'medium':
      imageSize = 'zm_xs';
      break;

    case 'small':
      colSize = 'col-12';
      imageSize = 'zm_xss';
      break;

    default:
      break;
  }

  return (
    <div className={`${colSize} ${size} publ-cat__col`}>
      <div className="publ-cat">
        <ArticleFeatured
          size={imageSize}
          image={featuredImage}
          alt={title}
          slug={slug}
        />
        <div className="publ-cat__wrapper">
          <ArticleTitle
            highlightInTitle={highlightInTitle}
            post={post}
            className={`text-capitalize publ-cat__title publ-cat__title--${titleModificator} font-weight-semibold`}
          />
          <div className="article__meta">
            <ArticleAuthor className="article__author" author={author} />
          </div>
        </div>
      </div>
    </div>
  );
};

PublicationsCats.propTypes = {
  size: PropTypes.any,
  isFirst: PropTypes.bool,
  post: PropTypes.object,
  highlightInTitle: PropTypes.any,
};
export default PublicationsCats;
