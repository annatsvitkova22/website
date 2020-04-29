import React from 'react';
import * as classnames from 'classnames';

import ArticleTitle from '~/components/Article/Title';
import ArticleFeatured from '~/components/Article/Featured';
import ArticleDateTime from '~/components/Article/DateTime';

const ArticleEvents = ({ post, children, className }) => {
  const { streetName, streetNumber, city } = post.zmAfishaACF.eventAddress;
  const { eventTime } = post.zmAfishaACF;
  const withImage = post.featuredImage ? '' : 'article--no-image';
  console.log(post);
  return (
    <article
      className={classnames('article--events', withImage, className)}
      key={post.id}
    >
      <ArticleDateTime time={eventTime} />
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
