import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import BlogsLoader from '~/components/Loaders/BlogsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import PublicationMainLoader from '~/components/Loaders/PublicationMainLoader';

const PUBLICATIONS_ARCHIVE = gql`
  query PublicationsArchive($cursor: String, $articles: Inh) {
    publications(first: $articles, before: $cursor) {
      nodes {
        excerpt
        title
        slug
        id
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const Publications = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    PUBLICATIONS_ARCHIVE,
    props,
    'publications'
  );

  if (!state.data.nodes) return <PublicationMainLoader />;
  const { nodes, pageInfo } = state.data;

  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {nodes.map((publication, i) => (
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
              {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                <Waypoint onEnter={fetchingContent} />
              )}
            </article>
          ))}
        </div>
        {state.isLoading && <BlogsLoader />}
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
    variables: {
      cursor: null,
    },
  });

  const { publications } = data;

  return publications;
};

export default Publications;
