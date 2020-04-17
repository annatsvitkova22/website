import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import apolloClient from '~/lib/ApolloClient';
import BlogsLoader from '~/components/Loaders/BlogsLoader';

const BLOGS_ARCHIVE = gql`
  query BlogsArchive($cursor: String) {
    blogs(first: 5, before: $cursor) {
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

const BlogsArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(BLOGS_ARCHIVE, props, 'blogs');

  if (!state.data.nodes)
    return (
      <div style={{ margin: '0 auto' }}>
        <BlogsLoader />
        <BlogsLoader />
      </div>
    );

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
          {nodes.map((blog, i) => (
            <article key={i} style={{ height: '300px' }}>
              <Link href="/blogs/[slug]" as={`/blogs/${blog.slug}`}>
                <a>
                  <h3>{blog.title}</h3>
                </a>
              </Link>
              <div>{blog.excerpt}</div>
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

BlogsArchive.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      cursor: PropTypes.string,
    })
  ),
};

BlogsArchive.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }
  const { data } = await apolloClient.query({
    query: BLOGS_ARCHIVE,
    variables: {
      cursor: null,
    },
  });

  const { blogs } = data;

  return blogs;
};

export default BlogsArchive;
