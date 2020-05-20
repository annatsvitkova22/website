import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

import ArticleTitle from '~/components/Article/Title';
import ArticleFeatured from '~/components/Article/Featured';
import ArticleStatus from '~/components/Article/Status';
import ArticleExcerpt from '~/components/Article/Excerpt';
import ArticleAuthor from '~/components/Article/Author';
import ArticleDate from '~/components/Article/Date';
import getCFStatus from '~/lib/getCFStatus';
import CrowdfundingProgress from '~/components/Crowdfunding/Progress';

const ArticleCrowdfundings = ({ imageSize, post, children, className }) => {
  const { featuredImage, title, slug, excerpt, author, date } = post;
  const status = getCFStatus(post);
  return (
    <article className={classnames('article--crowdfunding', className)}>
      {status && <ArticleStatus {...status} />}
      <ArticleFeatured
        className="article__image"
        image={featuredImage}
        size={imageSize}
        alt={title}
        slug={slug}
      />
      <div className="article__main">
        <ArticleTitle post={post} className="article__title" />
        <ArticleExcerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
        <CrowdfundingProgress post={post} />
        <div className="article__meta">
          <ArticleAuthor
            className="article__author meta-author--grey"
            author={author}
          />
          <span className="article__meta-divider">-</span>
          <ArticleDate
            className="article__time"
            date={date}
            format={'DD MMMM YYYY'}
          />
        </div>
        {children}
      </div>
    </article>
  );
};

ArticleCrowdfundings.propTypes = {
  post: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default ArticleCrowdfundings;
