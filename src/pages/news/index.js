import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';

const NEWS_ARCHIVE = gql`
  query NewsArchive($last: Int, $cursor: String) {
    posts(first: $last, before: $cursor) {
      edges {
        cursor
        node {
          id
          excerpt
          title
          slug
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const News = () => {
  const { loading, data, fetchMore } = useQuery(NEWS_ARCHIVE, {
    variables: {
      last: 5,
      cursor: null,
    },
  });

  if (loading) return <div>loading...</div>;

  const { edges } = data.posts;

  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {edges.map((post, i) => (
          <article key={post.id} style={{ height: '300px' }}>
            <Link href="/news/[slug]" as={`/news/${post.node.slug}`}>
              <a href={`/news/${post.node.slug}`}>
                <h3>{post.node.title}</h3>
              </a>
            </Link>
            <div>{post.node.excerpt}</div>
            {i === edges.length - 1 && (
              <Waypoint
                onEnter={() =>
                  fetchMore({
                    variables: {
                      last: 5,
                      cursor:
                        data.posts.edges[data.posts.edges.length - 1].cursor,
                    },
                    updateQuery: (pv, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return pv;
                      }
                      return {
                        posts: {
                          __typename: 'RootQueryToPostConnection',
                          edges: [
                            ...pv.posts.edges,
                            ...fetchMoreResult.posts.edges,
                          ],
                          hasNextPage:
                            fetchMoreResult.posts.pageInfo.hasNextPage,
                        },
                      };
                    },
                  })
                }
              />
            )}
          </article>
        ))}
      </main>
    </div>
  );
};

News.propTypes = {
  posts: PropTypes.any,
};

export default News;
