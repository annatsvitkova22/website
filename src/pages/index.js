import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import client from '../lib/ApolloClient';

const PAGE_QUERY = gql`
  query PageQuery($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
    }
  }
`;

const Home = (props) => {
  return (
    <div className="container">
      <Head>
        <title>Next Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>
    </div>
  );
};

Home.getInitialProps = async ({ pathname }) => {
  const result = await client.query({
    query: PAGE_QUERY,
    variables: { uri: 'welcome' },
  });

  return {
    page: result.data,
  };
};

export default Home;
