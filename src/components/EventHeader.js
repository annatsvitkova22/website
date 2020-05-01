import React from 'react';
import he from 'he';

import Icons from '~/components/Icons';
import ArticleDateTime from '~/components/Article/DateTime';

const EventHeader = ({ event }) => {
  const location = event.zmAfishaACF.eventAddress.streetAddress
    .split(',')
    .slice(0, 1)
    .join();
  const date = event.zmAfishaACF.eventDate;
  const title = he.decode(event.title);

  return (
    <div className="event__hero-title-wrapper">
      <div className="event__hero-content">
        <ArticleDateTime time={event.zmAfishaACF.eventTime} date={date} />
        <h1 className="event__hero-title">{title}</h1>
        {event.excerpt && (
          <div
            className="event__hero-excerpt"
            dangerouslySetInnerHTML={{ __html: event.excerpt }}
          />
        )}
        <div className="event__hero-location">
          <Icons icon="location" className="event__hero-location-icon" />
          {location}
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
