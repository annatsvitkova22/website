import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';

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
        {publications.map((post) => (
          <article>
            <Link href="/publications/[slug]" as={`/publications/${post.slug}`}>
              <a href={`/publications/${post.slug}`}>
                <h3>{post.title}</h3>
              </a>
            </Link>
            <div>{post.excerpt}</div>
          </article>
        ))}
      </main>
    </div>
  );
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
