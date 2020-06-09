import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

import ArticleTitle from '~/components/Article/Title';
import ArticleFeatured from '~/components/Article/Featured';
import ArticleDateTime from '~/components/Article/DateTime';

const ArticleEvents = ({ post, children, className }) => {
  const { streetName = null, streetNumber = null, city = null } = post
    .zmAfishaACF.eventAddress
    ? post.zmAfishaACF.eventAddress
    : {};

  const { eventTime, eventDate } = post.zmAfishaACF;
  const withImage = post.featuredImage ? '' : 'article--no-image';

  return (
    <article className={classnames('article--events', withImage, className)}>
      <ArticleDateTime time={eventTime} date={eventDate} />
      <ArticleFeatured
        size={'zm_xs_rect'}
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

ArticleEvents.propTypes = {
  post: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default ArticleEvents;
