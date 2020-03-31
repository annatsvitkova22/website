import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const EVENTS_ARCHIVE = gql`
  query EventsArchive {
    events {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const EventsArchive = (props) => {
  const { events } = props;
  return (
    <div className="events-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {events.map((event, i) => (
          <article key={i}>
            <Link href="/events/[slug]" as={`/events/${event.slug}`}>
              <a>
                <h3>{event.title}</h3>
              </a>
            </Link>
            <div>{event.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

EventsArchive.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

EventsArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: EVENTS_ARCHIVE,
  });

  return {
    events: data.events.nodes,
  };
};

export default EventsArchive;
