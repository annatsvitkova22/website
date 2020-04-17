import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';

const NEWS_ARCHIVE = gql`
  query NewsArchive($cursor: String) {
    posts(first: 5, before: $cursor) {
      nodes {
        id
        excerpt
        title
        slug
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const News = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    NEWS_ARCHIVE,
    props,
    'news'
  );

  if (!state.data.nodes) {
    return (
      <div>
        <NewsLoader />
        <NewsLoader />
        <NewsLoader />
      </div>
    );
  }

  const { nodes, pageInfo } = state.data;

  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <React.Fragment>
          <div>
            {nodes.map((post, i) => (
              <article key={post.id} style={{ height: '300px' }}>
                <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                  <a href={`/news/${post.slug}`}>
                    <h3>{post.title}</h3>
                  </a>
                </Link>
                <div>{post.excerpt}</div>
                {i === nodes.length - 1 && i < pageInfo.total -1 && (
                  <Waypoint onEnter={fetchingContent} />
                )}
              </article>
            ))}
          </div>
          {state.isLoading && <NewsLoader />}
        </React.Fragment>
      </main>
    </div>
  );
};

News.propTypes = {
  posts: PropTypes.any,
};

News.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }
  const { data } = await apolloClient.query({
    query: NEWS_ARCHIVE,
    variables: {
      cursor: null,
    },
  });
  const { posts } = data;
  return posts;
};

export default News;
