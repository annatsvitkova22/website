import React, { useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import BlogsLoader from '~/components/Loaders/BlogsLoader';
import BloggerRow from '~/components/Blogger/Row';

const BLOGGERS = gql`
  query Bloggers {
    users(
      where: {
        orderby: { field: REGISTERED, order: ASC }
        hasPublishedPosts: BLOG
      }
    ) {
      nodes {
        name
        blogs(first: 3) {
          nodes {
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
          }
        }
      }
    }
  }
`;

const BlogsArchive = ({ users }) => {
  const [state, setState] = useState({ users });

  if (!state.users) {
    return (
      <div className="container">
        <div className="blogs-page">
          <div className="row">
            <main className="blogs-page__content col-12">
              <BlogsLoader />
              <BlogsLoader />
              <BlogsLoader />
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="blogs-page">
        <div className="row">
          <main className="blogs-page__content col-12">
            {state.users.nodes.map((row, index) => {
              return (
                <>
                  <BloggerRow key={index} {...row} />
                  {state.users.nodes.length / 2 - 1 === index && (
                    <div>most popular block</div>
                  )}
                </>
              );
            })}
          </main>
        </div>
      </div>
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
  const {
    data: { users },
  } = await apolloClient.query({
    query: BLOGGERS,
  });

  users.nodes = users.nodes.filter((blogger) => {
    return blogger.blogs.nodes.length > 0;
  });

  return { users };
};

export default BlogsArchive;
