import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

import ArticleTitle from '~/components/Article/Title';
import ArticleList from '~/components/Article/List';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleOpportunities = ({ post, children, className }) => {
  console.log(post.featuredImage);
  return (
    <article
      className={classnames('article--opportunities', className)}
      key={post.id}
    >
      <div className="article__wrapper">
        <ArticleFeatured
          className="article__image"
          size={'zm_xss_square'}
          image={post.featuredImage}
          alt={post.title}
          slug={post.slug}
        />
        <div className="article__main">
          <ArticleTitle post={post} className="article__title" />
          <ArticleList info={post.zmAfishaACF} />
        </div>
      </div>
      {children}
    </article>
  );
};

ArticleOpportunities.propTypes = {
  post: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.any,
};

export default ArticleOpportunities;
