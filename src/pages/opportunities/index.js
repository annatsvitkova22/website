import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const OPPORTUNITIES_ARCHIVE = gql`
  query OpportunitiesArchive {
    opportunities {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const OpportunitiesArchive = (props) => {
  const { opportunities } = props;
  return (
    <div className="opportunities-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {opportunities.map((opportunity, i) => (
          <article key={i}>
            <Link
              href="/opportunities/[slug]"
              as={`/opportunities/${opportunity.slug}`}
            >
              <a>
                <h3>{opportunity.title}</h3>
              </a>
            </Link>
            <div>{opportunity.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

OpportunitiesArchive.propTypes = {
  opportunities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

OpportunitiesArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: OPPORTUNITIES_ARCHIVE,
  });

  return {
    opportunities: data.opportunities.nodes,
  };
};

export default OpportunitiesArchive;
