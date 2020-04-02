import React from 'react';
import PropTypes from 'prop-types';

import useFilterHook from '~/hooks/useFilterHook';
import '../styles/components/eventsPost.scss';
import EventPostItem from '~/components/EventsPostItem';

const EventsPost = (props) => {
  const { filter, eventsData, date } = props;

  const { data } = useFilterHook(filter, eventsData, date);

  return (
    <div>
      {data &&
        data.map((item, index) => {
          return <EventPostItem key={index} item={item} />;
        })}
    </div>
  );
};

EventsPost.propTypes = {
  filter: PropTypes.string,
  eventsData: PropTypes.object,
  date: PropTypes.any,
};

export default EventsPost;
