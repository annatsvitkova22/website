import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';
import EventsFilter from '~/components/EventsFilter';
import EventsPost from '~/components/EventsPost';

const EVENTS_QUERY = gql`
  query EventsQuery {
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

const Events = ({ events }) => {
  const [filter, setFilter] = useState(null);
  const [date, setDate] = useState(new Date().getDate());

  const eventFilter = (event) => {
    const eventTarget = event.currentTarget.name;

    setFilter(eventTarget);
    setDate(new Date(event.currentTarget.value));
  };

  return (
    <main className="wrapper">
      <EventsFilter eventFilter={eventFilter} />
      <EventsPost eventsData={events} filter={filter} date={date} />
    </main>
  );
};

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

Events.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: EVENTS_QUERY,
  });

  return {
    events: data.events.nodes,
  };
};

export default Events;
