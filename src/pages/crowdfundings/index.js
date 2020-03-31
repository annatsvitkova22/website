import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const CROWDFUNDINGS_ARCHIVE = gql`
  query CrowdfundingsArchive {
    crowdfundings {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const CrowdfundingsArchive = (props) => {
  const { crowdfundings } = props;
  return (
    <div className="crowdfundings-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {crowdfundings.map((event, i) => (
          <article key={i}>
            <Link
              href="/crowdfundings/[slug]"
              as={`/crowdfundings/${event.slug}`}
            >
              <a>
                <h3>{event.title}</h3>
              </a>
            </Link>
            <div>{event.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

CrowdfundingsArchive.propTypes = {
  crowdfundings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

CrowdfundingsArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: CROWDFUNDINGS_ARCHIVE,
  });

  return {
    crowdfundings: data.crowdfundings.nodes,
  };
};

export default CrowdfundingsArchive;
