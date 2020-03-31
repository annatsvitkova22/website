import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const OTHERS_ARCHIVE = gql`
  query OthersArchive {
    others {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const OthersArchive = (props) => {
  const { others } = props;
  return (
    <div className="others-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {others.map((other, i) => (
          <article key={i}>
            <Link href="/others/[slug]" as={`/others/${other.slug}`}>
              <a>
                <h3>{other.title}</h3>
              </a>
            </Link>
            <div>{other.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

OthersArchive.propTypes = {
  others: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

OthersArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: OTHERS_ARCHIVE,
  });

  return {
    others: data.others.nodes,
  };
};

export default OthersArchive;
