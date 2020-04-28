import React from 'react';
import * as classnames from 'classnames';

import ArticleTitle from '~/components/Article/Title';
import ArticleFeatured from '~/components/Article/Featured';

const ArticleEvents = ({ post, children, className }) => {
  const { streetName, streetNumber, city } = post.zmAfishaACF.eventAddress;
  return (
    <article className={classnames('article--events', className)} key={post.id}>
      <ArticleFeatured
        className="article__image"
        image={post.featuredImage}
        alt={post.title}
        slug={post.slug}
      />
      <ArticleTitle post={post} className="article__title" />
      <p className="article__address">
        {streetName && (
          <span className="article__address-street">
            {streetName}, {streetNumber}
          </span>
        )}
        {city && <span className="article__address-city">м. {city}</span>}
      </p>
      {children}
    </article>
  );
};

export default ArticleEvents;
