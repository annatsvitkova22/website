import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import client from '../lib/ApolloClient';

const HOME_PAGE = gql`
  query PageQuery {
    homepage {
      id
      title
      content
    }
  }
`;

const Home = (props) => {
  const { page } = props;
  return (
    <div className="container">
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
  // const result = await client.query({
  //   query: HOME_PAGE,
  // });
  const result = {
    data: {
      homepage: {
        title: 'temp title',
        content: 'temp content',
        id: 'temp-id',
      },
    },
  };

  return {
    page: result.data.homepage,
  };
};

export default Home;
