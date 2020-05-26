import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import getConfig from 'next/config';

import apolloClient from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import Content from '~/components/Content';
import GutenbergLoader from '~/components/Loaders/GutenbergLoader';
import NotFound from '~/pages/404';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const PAGE = gql`
  query Page($uri: String!) {
    pageBy(uri: $uri) {
      title
      ${gutenbergBlocksQuery}
    }
  }
`;

const Page = (props) => {
  const [state, setState] = useState({
    page: props.page,
    notFound: props.notFound,
  });

  const { page, isLoading, notFound } = state;

  const loadPage = async () => {
    setState({ ...state, isLoading: true });

    const { data } = await apolloClient.query({
      query: PAGE,
      variables: { uri: props.query.uri },
    });

    setState({
      ...state,
      page: data.pageBy,
      isLoading: false,
      notFound: !data.pageBy,
    });
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

  if (notFound) {
    return <NotFound />;
  }

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
          <title>ЗМІСТ - {page.title}</title>

          <meta name="title" content="ЗМІСТ - Зміни створюєш ти!" />
          <meta
            name="description"
            content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${config.frontUrl}`} />
          <meta property="og:title" content="ЗМІСТ - Зміни створюєш ти!" />
          <meta
            property="og:description"
            content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
          />
          <meta property="og:image" content="/zmist.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={`${config.frontUrl}`} />
          <meta property="twitter:title" content="ЗМІСТ - Зміни ствоюєш ти!" />
          <meta
            property="twitter:description"
            content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
          />
          <meta property="twitter:image" content="/zmist.jpg" />
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

Page.getInitialProps = async ({ query, res }) => {
  if (process.browser) {
    return { query };
  }

  const { data } = await apolloClient.query({
    query: PAGE,
    variables: { uri: query.uri },
  });

  if (!data.pageBy) {
    res.statusCode = 404;
  }

  return {
    query,
    page: data.pageBy,
    notFound: !data.pageBy,
  };
};

export default Page;
