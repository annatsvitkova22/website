import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import apolloClient from '~/lib/ApolloClient';

const EVENT = gql`
  query Event($slug: String!) {
    eventBy(slug: $slug) {
      title
      content
    }
  }
`;

const Event = (props) => {
  const { event } = props;
  return (
    <div className="single-event">
      <Head>
        <title>{event.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{event.title}</h1>

        <div className="description">{event.content}</div>
      </main>
    </div>
  );
};

Event.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: EVENT,
    variables: { slug },
  });

  return {
    event: data.eventBy,
  };
};

export default Event;
