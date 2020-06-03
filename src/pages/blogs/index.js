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
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import NewsLoader from '~/components/Loaders/NewsLoader';
import { ArticleProvider } from '~/components/Article/Context';
import ArticleNews from '~/components/Article/News';

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
        slug
        description
        stats: blogs(first: 9999) {
          pageInfo {
            total
          }
          nodes {
            commentCount
            statisticsACF {
              views
            }
          }
        }
        userAdditionalACF {
          avatar {
            mediaItemUrl
          }
        }
        bloggerInfoACF {
          info
          socials {
            name
            url
          }
        }
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
  query PopularBlogs {
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

const ALL_BLOGS = gql`
  query AllBLogs($articles: Int = 3, $cursor: String) {
    blogs(first: $articles, before: $cursor) {
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
          id
          name
          nicename
          nickname
          username
          slug
        }
        commentCount
        comments {
          nodes {
            author {
              ... on CommentAuthor {
                id
                name
              }
            }
            content
            commentId
            date
            commentACF {
              likes
            }
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

const BlogsArchive = ({ users }) => {
  const [mainState, setMainState] = useState({ users });
  const [popular, setPopular] = useState();

  const variables = {
    articles: 3,
    onLoadNumber: 3,
    cursor: null,
  };

  const { fetchingContent, state } = useLoadMoreHook(
    ALL_BLOGS,
    {},
    'blogs',
    variables.articles,
    variables.onLoadNumber
  );

  useEffect(() => {
    const loadBlogs = async () => {
      const usrs = await loadBloggersGQL();
      setMainState({ users: usrs });
    };

    if (!mainState.users) {
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

  if (!mainState.users) {
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

  const { nodes, pageInfo } = state.data;

  return (
    <div className="container">
      <Head>
        <title>ЗМІСТ - Блоги</title>
      </Head>
      <div className="blogs-page">
        <div className="row">
          <main className="blogs-page__content col-12">
            {mainState.users.nodes.map((row, index) => {
              return (
                <React.Fragment key={index}>
                  <BloggerRow withLinks inRow={3} {...row} />
                  {Math.round(mainState.users.nodes.length / 2) - 1 ===
                    index && (
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
                        <div className="blogs-similar blogs-similar--loading">
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
            <hr />
            <div className="blogs-page__archive">
              {nodes &&
                nodes.map((post, i) => (
                  <React.Fragment key={i}>
                    <ChronologicalSeparator posts={nodes} currentIndex={i} />
                    <ArticleProvider value="blogs">
                      <ArticleNews post={post} className={'article'}>
                        {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                          <Waypoint onEnter={fetchingContent} />
                        )}
                      </ArticleNews>
                    </ArticleProvider>
                  </React.Fragment>
                ))}
              {!nodes ||
                (state.isLoading && (
                  <>
                    <NewsLoader />
                    <NewsLoader />
                    <NewsLoader />
                  </>
                ))}
            </div>
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
  users: PropTypes.any,
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
