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

  if (loading) return null;

  const eventFilter = (event) => {
    if (event.currentTarget.name === 'actual') {
      return setFilter('actual');
    }
    if (event.currentTarget.name === 'finished') {
      return setFilter('finished');
    }
    if (event.currentTarget.name === 'forDate') {
      const forDate = new Date(event.currentTarget.value);
      if (forDate) {
        setFilter(forDate);
      }
    }
  };

  return (
    <main className="wrapper">
      <EventsFilter eventFilter={eventFilter} />
      <EventsPost eventsData={data.events.nodes} filter={filter} />
    </main>
  );
};

export default Events;
