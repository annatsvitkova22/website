import React from 'react';
import * as classnames from 'classnames';

import ArticleTitle from '~/components/Article/Title';
import ArticleFeatured from '~/components/Article/Featured';
import EventTime from '~/components/Article/Date';

const ArticleEvents = ({ post, children, className }) => {
  const { streetName, streetNumber, city, eventTime } = post.zmAfishaACF.eventAddress;
  console.log(post);
  return (
    <article className={classnames('article--events', className)} key={post.id}>
      <div className="meta-date-group">
        <p className="meta-date-group__day">24</p>
        <p className="meta-date-group__month">Березня</p>
        <EventTime date={eventTime} className="meta-date--colored" />
      </div>
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
