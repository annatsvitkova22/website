import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import NewsArticle from '~/components/Articles/NewsArticle';

const NEWS_ARCHIVE = gql`
  query NewsArchive($cursor: String) {
    posts(first: 5, before: $cursor) {
      nodes {
        id
        title
        slug
        featuredImage {
          mediaItemUrl
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        author {
          name
          nicename
          nickname
          slug
          userId
          username
        }
        comments {
          pageInfo {
            total
          }
        }
        date
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
          <div className={'container'}>
            {nodes.map((post, i) => (
              <NewsArticle post={post} key={post.id}>
                {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                  <Waypoint onEnter={fetchingContent} />
                )}
              </NewsArticle>
            ))}
            {state.isLoading && <NewsLoader />}
          </div>
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
