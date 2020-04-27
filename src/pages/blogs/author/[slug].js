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
import { setIsChanged } from '~/stores/News';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import Article from '~/components/Article';
import NewsLoader from '~/components/Loaders/NewsLoader';
import { ArticleProvider } from '~/components/Article/Context';
import ArticleNews from '~/components/Article/News';
import ArticleBlogsWide from '~/components/Article/Blogs/Wide';
import BloggerLoader from '~/components/Loaders/Blogger';

const composeQuery = ({ cursor, articles, slug }) => {
  return gql`
    query Blogger($cursor: String = ${cursor}, $articles: Int = ${articles}) {
      users(where: { search: "${slug}", searchColumns: "slug" }) {
        nodes {
          name
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
                name
                nicename
                nickname
                slug
                userId
                username
              }
            }
            pageInfo {
              endCursor
              total
            }
          }
        }
      }
    }
  `;
};

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

const BlogsArchive = ({ users, query }) => {
  const [popular, setPopular] = useState();

  let variables = {
    articles: 8,
    onLoadNumber: 2,
    cursor: null,
    slug: query.slug,
  };

  const { fetchingContent, state } = useLoadMoreHook(
    composeQuery(variables),
    users,
    'blogger',
    variables.articles,
    variables.onLoadNumber,
    false,
    () => {},
    variables.slug
  );

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

  if (!state.data.users) {
    return (
      <div className="container">
        <div className="blogger-page">
          <div className="row">
            <main className="blogger-page__content col-12">
              <BloggerLoader />
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        {/* TODO: change it */}
        <title>{`ЗМІСТ | Блоги - `}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="blogger-page">
        <div className="row">
          <main className="blogger-page__content col-12">
            {state.data.users.nodes.map((row, index) => {
              return (
                <React.Fragment key={index}>
                  <BloggerRow
                    waypoint={<Waypoint onEnter={fetchingContent} />}
                    isLoading={state.isLoading}
                    loader={<PostCardLoader type={'small'} />}
                    inRow={2}
                    {...row}
                  />
                </React.Fragment>
              );
            })}
          </main>
          {state.data.users.nodes[0].blogs.pageInfo.total ===
            state.data.users.nodes[0].blogs.nodes.length && (
            <Waypoint onEnter={loadMostPopular} />
          )}
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
            <div className="posts-similar posts-similar--loading posts-similar--blogs">
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
        </div>
      </div>
    </div>
  );
};

BlogsArchive.getInitialProps = async ({ query }) => {
  if (process.browser) {
    return { query };
  }
  const users = await loadBloggerGQL(query.slug);

  return { users, query };
};

export default BlogsArchive;

const loadBloggerGQL = async (slug) => {
  const {
    data: { users },
  } = await apolloClient.query({
    query: composeQuery({
      articles: 8,
      cursor: null,
      slug,
    }),
  });

  return { users };
};
