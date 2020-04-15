import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Waypoint } from 'react-waypoint';

import PostCardLoader from '~/components/Loaders/PostCardLoader';
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
        endCursor
        total
      }
    }
  }
`;

const News = (props) => {
  const [edges, setEdges] = useState(props.initialPosts.posts.edges);
  console.log(props.initialPosts.posts.pageInfo.total);
  useEffect(() => {
    async function loadData() {
      const { data } = await apolloClient.query({
        query: NEWS_ARCHIVE,
      });
      setEdges(data.posts.edges);
    }
    if (!edges) {
      loadData();
    }
  }, []);

  const { fetchMore } = useQuery(NEWS_ARCHIVE, {
    variables: {
      last: 5,
      cursor: edges[edges.length - 1].cursor,
    },
    notifyOnNetworkStatusChange: true,
  });

  const fetchingContent = async () => {
    const newData = fetchMore({
      variables: {
        last: 5,
        cursor: edges[edges.length - 1].cursor,
      },
      updateQuery: (pv, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.posts.edges;
        const pageInfos = fetchMoreResult.posts.pageInfo;
        if (newEdges) {
          return {
            posts: {
              __typename: pv.posts.__typename,
              edges: [...pv.posts.edges, ...newEdges],
              pageInfo: [...pv.posts.pageInfo, ...pageInfos],
              hasNextPage: pageInfos.hasNextPage,
            },
          };
        }
        return pv;
      },
    });
    const database = await newData;
    const newEdges = database.data.posts.edges;
    setEdges(edges.concat(newEdges));
  };

  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {edges.map((post, i) => (
            <article key={post.id} style={{ height: '300px' }}>
              <Link href="/news/[slug]" as={`/news/${post.node.slug}`}>
                <a href={`/news/${post.node.slug}`}>
                  <h3>{post.node.title}</h3>
                </a>
              </Link>
              <div>{post.node.excerpt}</div>
              {i === edges.length - 1 &&
                i < props.initialPosts.posts.pageInfo.total - 1 && (
                  <Waypoint onEnter={fetchingContent} />
                )}
            </article>
          ))}
        </div>
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
      last: 5,
      cursor: null,
    },
  });

  return {
    initialPosts: data,
  };
};

export default News;
