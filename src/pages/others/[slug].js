import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import apolloClient from '~/lib/ApolloClient';

// Others

const OTHERS = gql`
  query Other($slug: String!) {
    otherBy(slug: $slug) {
      title
      content
    }
  }
`;

const Other = (props) => {
  const { other } = props;
  return (
    <div className="single-other">
      <Head>
        <title>{other.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{other.title}</h1>

        <div className="description">{other.content}</div>
      </main>
    </div>
  );
};

Other.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: OTHERS,
    variables: { slug },
  });

  return {
    other: data.otherBy,
  };
};

export default Other;
