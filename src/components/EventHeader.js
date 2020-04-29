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
    <div className="event__title-wrapper">
      <div className="event__content">
        <ArticleDateTime time={event.zmAfishaACF.eventTime} date={date} />
        <h1 className="event__title">{event.title}</h1>
        <div
          className="event__excerpt"
          dangerouslySetInnerHTML={{ __html: event.excerpt }}
        />
        <div className="event__location">
          <Icons icon="location" />
          {location}
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
