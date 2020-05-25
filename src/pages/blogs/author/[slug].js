import React, { useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { Waypoint } from 'react-waypoint';
import getConfig from 'next/config';

import apolloClient from '~/lib/ApolloClient';
import BloggerRow from '~/components/Blogger/Row';
import SimilarPosts from '~/components/SimilarPosts';
import PostCardLoader from '~/components/Loaders/PostCardLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import BloggerLoader from '~/components/Loaders/Blogger';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const composeQuery = ({ cursor, articles, slug }) => {
  return gql`
    query Blogger($cursor: String = ${cursor}, $articles: Int = ${articles}) {
      users(where: { search: "${slug}", searchColumns: "slug" }) {
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

  const variables = {
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

  console.log(state.data.users.nodes[0]);

  return (
    <div className="container">
      <Head>
        <title>{`ЗМІСТ - Блоги - ${state.data.users.nodes[0].name}`}</title>

        <meta
          name="title"
          content={`ЗМІСТ - Блоги - ${state.data.users.nodes[0].name}`}
        />
        {state.data.users.nodes[0].description && (
          <meta
            name="description"
            content={state.data.users.nodes[0].description}
          />
        )}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${config.frontUrl}/blogs/author/${state.data.users.nodes[0].slug}`}
        />
        <meta
          property="og:title"
          content={`ЗМІСТ - Блоги - ${state.data.users.nodes[0].name}`}
        />
        {state.data.users.nodes[0].description && (
          <meta
            property="og:description"
            content={state.data.users.nodes[0].description}
          />
        )}
        <meta property="og:image" content="/zmist.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${config.frontUrl}`} />
        <meta
          property="twitter:title"
          content={`ЗМІСТ - Блоги - ${state.data.users.nodes[0].name}`}
        />
        {state.data.users.nodes[0].description && (
          <meta
            property="twitter:description"
            content={state.data.users.nodes[0].description}
          />
        )}
        <meta property="twitter:image" content="/zmist.jpg" />
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
                    showBio={true}
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
