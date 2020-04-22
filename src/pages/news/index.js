import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import Article from '~/components/Article';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import '~/styles/pages/news.scss';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';

const NEWS_ARCHIVE = gql`
  query NewsArchive($cursor: String, $articles: Int) {
    posts(first: $articles, before: $cursor) {
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
      <div className="container">
        <div className="news-archive row">
          <main className="news-archive__content col-md-8">
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
          </main>
          <aside className="news-archive__sidebar col-md-4">
            <SidebarLoader />
          </aside>
        </div>
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

      <div className="container">
        <div className="news-archive row">
          <main className="news-archive__content col-md-8">
            {nodes.map((post, i) => (
              <>
                <ChronologicalSeparator posts={nodes} currentIndex={i} />
                <Article type="news" post={post} key={post.id}>
                  {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                    <Waypoint onEnter={fetchingContent} />
                  )}
                </Article>
              </>
            ))}
            {state.isLoading && <NewsLoader />}
          </main>
          <aside className="news-archive__sidebar col-md-4">
            <SidebarLoader />
          </aside>
        </div>
      </div>
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
      articles: 10,
      cursor: null,
    },
  });
  const { posts } = data;
  return posts;
};

export default News;
