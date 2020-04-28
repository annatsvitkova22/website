import React from 'react';

import Icons from '~/components/Icons';

const EventHeader = ({ event }) => {
  const location = event.zmAfishaACF.eventAddress.streetAddress
    .split(',')
    .slice(0, 1)
    .join();
  const date = event.zmAfishaACF.eventDate
    ? event.zmAfishaACF.eventDate.split(' ')
    : null;

  return (
    <div className="event__title-wrapper col-xl-8">
      <div className="event__content ">
        <div className="event__date">
          <span className="event__day">{date && date[0]}</span>
          <span className="event__month">{date && date[1]}</span>
          <span className="event__time">{event.zmAfishaACF.eventTime}</span>
        </div>
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
