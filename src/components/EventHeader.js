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
  console.log(event);
  return (
    <div className="event__title-wrapper col-xl-8">
      <div className="event__content ">
        <div className="event__date">
          {date && <span className="event__day">{date[0]}</span>}
          {date && <span className="event__month"> {date[1]}</span>}
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
