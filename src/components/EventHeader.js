import React from 'react';
import he from 'he';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';
import ArticleDateTime from '~/components/Article/DateTime';
import ArticleList from '~/components/Article/List';

const EventHeader = ({ event, withTime, withList }) => {
  const location = event.zmAfishaACF.eventAddress
    ? event.zmAfishaACF.eventAddress.streetAddress.split(',').slice(0, 1).join()
    : null;
  const date = event.zmAfishaACF.eventDate ? event.zmAfishaACF.eventDate : null;
  const title = he.decode(event.title);

  return (
    <div className="event__hero-title-wrapper">
      <div className="event__hero-content">
        {withTime && (
          <ArticleDateTime time={event.zmAfishaACF.eventTime} date={date} />
        )}

        <h1 className="event__hero-title">{title}</h1>
        {event.excerpt && (
          <div
            className="event__hero-excerpt"
            dangerouslySetInnerHTML={{ __html: event.excerpt }}
          />
        )}

        {withList ? (
          <ArticleList info={event.zmAfishaACF} />
        ) : (
          <>
            {location && (
              <div className="event__hero-location">
                <Icons icon="location" className="event__hero-location-icon" />
                {location}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

EventHeader.propTypes = {
  event: PropTypes.any,
  withTime: PropTypes.any,
  withList: PropTypes.any,
};

export default EventHeader;
