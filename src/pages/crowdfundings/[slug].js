import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const CROWDFUNDING = gql`
  query Crowdfunding($slug: String!) {
    crowdfundingBy(slug: $slug) {
      title
      content
    }
  }
`;

const Crowdfunding = (props) => {
  const { crowdfunding } = props;
  return (
    <div className="single-crowdfundings">
      <Head>
        <title>{crowdfunding.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{crowdfunding.title}</h1>

        <div className="description">{crowdfunding.content}</div>
      </main>
    </div>
  );
};

Crowdfunding.propTypes = {
  crowdfunding: PropTypes.object,
};

Crowdfunding.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: CROWDFUNDING,
    variables: { slug },
  });

  return {
    crowdfunding: data.crowdfundingBy,
  };
};

export default Crowdfunding;
