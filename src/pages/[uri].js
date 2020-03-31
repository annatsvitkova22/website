import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import apolloClient from '~/lib/ApolloClient';

const PAGE = gql`
  query Page($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
    }
  }
`;

const Page = (props) => {
  const { page } = props;
  return (
    <div className="page">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{page.title}</h1>

        <div className="description">{page.content}</div>
      </main>
    </div>
  );
};

Page.getInitialProps = async ({ query: { uri } }) => {
  const { data } = await apolloClient.query({
    query: PAGE,
    variables: { uri },
  });

  return {
    page: data.pageBy,
  };
};

export default Page;
