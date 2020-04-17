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
  const [posts, setPosts] = useState(props);
  const [endCursor, setEndCursor] = useState(
    props.pageInfo ? props.pageInfo.endCursor : null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
    async function loadData() {
      const { data } = await apolloClient.query({
        query: NEWS_ARCHIVE,
        variables: {
          cursor: null,
        },
      });
      setPosts(data.posts);
      setEndCursor(data.posts.pageInfo.endCursor);
    }
    setIsLoading(false);
    if (!posts.edges) {
      loadData();
    }
  }, []);

  const fetchingContent = async () => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const postsData = await apolloClient.query({
      query: NEWS_ARCHIVE,
      variables: {
        cursor: endCursor,
      },
    });

    setPosts({
      pageInfo,
      edges: [...posts.edges, ...postsData.data.posts.edges],
    });
    setEndCursor(
      postsData.data.posts.pageInfo
        ? postsData.data.posts.pageInfo.endCursor
        : false
    );
    setIsLoading(false);
  };

  if (!posts.edges) return <NewsLoader />;
  const { edges, pageInfo } = posts;

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
          {isLoading && <NewsLoader />}
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
