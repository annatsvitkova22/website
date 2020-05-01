import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import Content from '~/components/Content';
import GutenbergLoader from '~/components/Loaders/GutenbergLoader';

const PAGE = gql`
  query Page($uri: String!) {
    pageBy(uri: $uri) {
      title
      ${gutenbergBlocksQuery}
    }
  }
`;

const Page = (props) => {
  const [state, setState] = useState({ page: props.page });

  const { page, isLoading } = state;

  const loadPage = async () => {
    setState({ ...state, isLoading: true });

    const { data } = await apolloClient.query({
      query: PAGE,
      variables: { uri: props.query.uri },
    });

    setState({ ...state, page: data.pageBy, isLoading: false });
  };

  useEffect(() => {
    if (!page) {
      loadPage();
    }
  }, []);

  useEffect(() => {
    if (page && !props.page) {
      loadPage();
    }
  }, [props.query.uri]);

  if (!page || isLoading) {
    return (
      <div className="page">
        <div className="container">
          <div className="row">
            <main className="col-12">
              <GutenbergLoader />
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page">
        <Head>
          <title>{page.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container">
          <div className="row">
            <main className="col-12">
              <h1 className="title">{page.title}</h1>
              <Content content={page.blocks} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

Page.propTypes = {
  page: PropTypes.any,
};

Page.getInitialProps = async ({ query }) => {
  if (process.browser) {
    return { query };
  }

  const { data } = await apolloClient.query({
    query: PAGE,
    variables: { uri: query.uri },
  });

  return {
    query,
    page: data.pageBy,
  };
};

export default Page;
