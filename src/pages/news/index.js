import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';

const NEWS_ARCHIVE = gql`
  query NewsArchive($cursor: String) {
    posts(first: 5, before: $cursor) {
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
        endCursor
        total
      }
    }
  }
`;

const News = (props) => {
  const [state, setState] = useState({
    posts: props,
    endCursor: props.pageInfo ? props.pageInfo.endCursor : null,
    isLoading: false,
  });

  useEffect(() => {
    if (!state.isLoading) {
      setState({
        ...state,
        isLoading: true,
      });
    }
    async function loadData() {
      const { data } = await apolloClient.query({
        query: NEWS_ARCHIVE,
        variables: {
          cursor: null,
        },
      });
      setState({
        posts: data.posts,
        endCursor: data.posts.pageInfo.endCursor,
        isLoading: false,
      });
    }

    if (!state.posts.edges) {
      loadData();
    }
  }, []);

  const fetchingContent = async () => {
    if (!state.isLoading) {
      setState({
        ...state,
        isLoading: true,
      });
    }
    const postsData = await apolloClient.query({
      query: NEWS_ARCHIVE,
      variables: {
        cursor: state.endCursor,
      },
    });

    setState({
      isLoading: false,
      endCursor: postsData.data.posts.pageInfo
        ? postsData.data.posts.pageInfo.endCursor
        : false,
      posts: {
        pageInfo,
        edges: [...state.posts.edges, ...postsData.data.posts.edges],
      },
    });
  };

  if (!state.posts.edges) return <NewsLoader />;
  const { edges, pageInfo } = state.posts;

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
            {edges.map((post, i) => (
              <article key={post.id} style={{ height: '300px' }}>
                <Link href="/news/[slug]" as={`/news/${post.node.slug}`}>
                  <a href={`/news/${post.node.slug}`}>
                    <h3>{post.node.title}</h3>
                  </a>
                </Link>
                <div>{post.node.excerpt}</div>
                {i === edges.length - 1 && i < pageInfo.total - 1 && (
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
