import React from 'react';
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
  if (loading) return null;
  return (
    <main className="wrapper">
      <EventsFilter />
      <EventsPost eventsData={data.events.nodes} />
    </main>
  );
};

export default Events;
