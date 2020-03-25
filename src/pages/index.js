import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import client from '../lib/ApolloClient';
import '../styles/pages/home.scss';

// TODO: restore, create custom GraphQL resolver
// homepage {
//   id
//   title
//   content
// }

const HOME_PAGE = gql`
  query PageQuery {
    pages(where: { title: "Головна" }) {
      nodes {
        title
        content
      }
    }
  }
`;

const Home = (props) => {
  const { page } = props;
  return (
    <div className="container home-page">
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

Home.getInitialProps = async () => {
  const result = await client.query({
    query: HOME_PAGE,
  });

  return {
    page: result.data.pages.nodes[0],
  };
};

export default Home;
