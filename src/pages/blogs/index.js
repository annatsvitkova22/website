import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import BlogsLoader from '~/components/Loaders/BlogsLoader';
import BloggerRow from '~/components/Blogger/Row';
import SimilarPosts from '~/components/SimilarPosts';
import PostCardLoader from '~/components/Loaders/PostCardLoader';

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
          }
        }
      }
    }
  }
`;

// TODO: implement popular, not last
const POPULAR = gql`
  query Bloggers {
    blogs(first: 6) {
      nodes {
        id
        title
        slug
        featuredImage {
          mediaItemUrl
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
`;

const BlogsArchive = ({ users }) => {
  const [state, setState] = useState({ users });
  const [popular, setPopular] = useState();

  useEffect(() => {
    const loadBlogs = async () => {
      const users = await loadBloggersGQL();
      setState({ users });
    };

    if (!state.users) {
      loadBlogs();
    }
  }, []);

  const loadMostPopular = async () => {
    if (!popular) {
      const {
        data: { blogs },
      } = await apolloClient.query({
        query: POPULAR,
      });
      if (blogs.nodes.length > 0) {
        setPopular(blogs.nodes);
      }
    }
  };

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
                <React.Fragment key={index}>
                  <BloggerRow {...row} />
                  {Math.round(state.users.nodes.length / 2) - 1 === index && (
                    <>
                      <Waypoint onEnter={loadMostPopular} />
                      {popular && (
                        <SimilarPosts
                          similarPosts={popular}
                          title={'Популярні'}
                          link={{
                            label: 'Дивитися всі',
                            value: '/search?type=blogs',
                          }}
                        />
                      )}
                      {!popular && (
                        <div className="blogs-page__popular blogs-page__popular--loading">
                          <div>
                            <PostCardLoader type={'small'} />
                          </div>
                          <div>
                            <PostCardLoader type={'small'} />
                          </div>
                          <div>
                            <PostCardLoader type={'small'} />
                          </div>
                          <div>
                            <PostCardLoader type={'small'} />
                          </div>
                          <div>
                            <PostCardLoader type={'small'} />
                          </div>
                          <div>
                            <PostCardLoader type={'small'} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </React.Fragment>
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
  const users = await loadBloggersGQL();

  return { users };
};

export default BlogsArchive;

const loadBloggersGQL = async () => {
  const {
    data: { users },
  } = await apolloClient.query({
    query: BLOGGERS,
  });

  users.nodes = users.nodes.filter((blogger) => {
    return blogger.blogs.nodes.length > 0;
  });

  return users;
};
