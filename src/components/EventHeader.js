import React from 'react';

import Icons from '~/components/Icons';
import ArticleDateTime from '~/components/Article/DateTime';

const EventHeader = ({ event }) => {
  const location = event.zmAfishaACF.eventAddress.streetAddress
    .split(',')
    .slice(0, 1)
    .join();
  const date = event.zmAfishaACF.eventDate;

  return (
    <div className="event__hero-title-wrapper">
      <div className="event__hero-content">
        <ArticleDateTime time={event.zmAfishaACF.eventTime} date={date} />
        <h1 className="event__hero-title">{event.title}</h1>
        <div
          className="event__hero-excerpt"
          dangerouslySetInnerHTML={{ __html: event.excerpt }}
        />
        <div className="event__hero-location">
          <Icons icon="location" className="event__hero-location-icon" />
          {location}
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
