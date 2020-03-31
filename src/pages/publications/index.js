import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';

const PUBLICATIONS_ARCHIVE = gql`
  query PublicationsArchive {
    publications {
      nodes {
        excerpt
        title
        slug
      }
    }
  }
`;

const Publications = (props) => {
  const { publications } = props;
  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {publications.map((publication, i) => (
          <article key={i}>
            <Link
              href="/publications/[slug]"
              as={`/publications/${publication.slug}`}
            >
              <a href={`/publications/${publication.slug}`}>
                <h3>{publication.title}</h3>
              </a>
            </Link>
            <div>{publication.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

Publications.propTypes = {
  publications: PropTypes.any,
};

Publications.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: PUBLICATIONS_ARCHIVE,
  });

  return {
    publications: data.publications.nodes,
  };
};

export default Publications;
