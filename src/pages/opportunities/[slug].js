import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const OPPORTUNITY = gql`
  query Opportunity($slug: String!) {
    opportunityBy(slug: $slug) {
      title
      content
    }
  }
`;

const Opportunity = (props) => {
  const { opportunity } = props;
  return (
    <div className="single-opportunity">
      <Head>
        <title>{opportunity.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{opportunity.title}</h1>

        <div className="description">{opportunity.content}</div>
      </main>
    </div>
  );
};

Opportunity.propTypes = {
  opportunity: PropTypes.object,
};

Opportunity.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: OPPORTUNITY,
    variables: { slug },
  });

  return {
    opportunity: data.opportunityBy,
  };
};

export default Opportunity;
