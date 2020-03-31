import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import EventsFilter from '~/components/EventsFilter';
import EventsPost from '~/components/EventsPost';

const EVENTS_QUERY = gql`
  query MyQuery {
    events {
      nodes {
        id
        link
        title
        content
        date
      }
    }
  }
`;

const Events = () => {
  const { loading, data } = useQuery(EVENTS_QUERY);
  const [filter, setFilter] = useState(null);
  const [date, setDate] = useState(new Date().getDate());

  if (loading) return null;

  const eventFilter = (event) => {
    const eventTarget = event.currentTarget.name;

    setFilter(eventTarget);
    setDate(new Date(event.currentTarget.value));
  };

  return (
    <main className="wrapper">
      <EventsFilter eventFilter={eventFilter} />
      <EventsPost eventsData={data.events.nodes} filter={filter} date={date} />
    </main>
  );
};

export default Events;
