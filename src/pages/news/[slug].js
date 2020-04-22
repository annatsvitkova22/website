import React, { useState } from 'react';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import '../../styles/pages/post.scss';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import apolloClient from '~/lib/ApolloClient';
import NewsHead from '~/components/NewsHead';
import Share from '~/components/Share';
import NewsFooter from '~/components/NewsFooter';
import Content from '~/components/Content';
import SideBarNews from '~/components/SideBarNews';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import FeaturedImage from '~/components/FeaturedImage';

const POST = gql`
  query Post($slug: String!) {
    postBy(slug: $slug) {
      ${gutenbergBlocksQuery}
      title
      content
      date
      excerpt
      categories {
        nodes {
          id
          name
          link
        }
      }
      tags {
        nodes {
          id
          name
          link
        }
      }
      comments {
        pageInfo {
          total
        }
      }
      author {
        lastName
        firstName
      }
      featuredImage {
        id
        mediaItemUrl
        caption
        title
        author {
          name
          description
        }
      }
    }
  }
`;
const NEWS = gql`
  query News($cursor: String) {
    posts(first: 5, before: $cursor) {
      nodes {
        title
        link
        date
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const Post = ({ post, news }) => {
  const ref = React.useRef();

  const [state, setState] = useState({
    updNews: news,
    isLoading: false,
    endCursor: news.pageInfo.endCursor ? news.pageInfo.endCursor : null,
  });

  const fetchingContent = async () => {
    if (!state.isLoading) {
      setState({
        ...state,
        isLoading: true,
      });
    }

    const postsData = await apolloClient.query({
      query: NEWS,
      variables: {
        cursor: state.endCursor,
      },
    });

    setState({
      isLoading: false,
      endCursor: postsData.data.posts.pageInfo
        ? postsData.data.posts.pageInfo.endCursor
        : false,
      updNews: {
        pageInfo: postsData.data.posts.pageInfo,
        nodes: [...state.updNews.nodes, ...postsData.data.posts.nodes],
      },
    });
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="single-post container">
        {post ? (
          <>
            <div className={'single-post__title row'}>
              <div className={'col-lg-9'}>
                <NewsHead post={post} />
                <FeaturedImage data={post.featuredImage} />
              </div>
              <StickyBox
                offsetTop={20}
                offsetBottom={20}
                className={'side-bar__wrapper col-lg-3'}
              >
                <section className={'latest'}>
                  <SideBarNews
                    news={state.updNews}
                    ref={ref}
                    fetchingContent={fetchingContent}
                    isLoading={state.isLoading}
                  />
                </section>
              </StickyBox>

              <section className={'single-post__main col-lg-9'}>
                <StickyBox
                  offsetTop={20}
                  offsetBottom={20}
                  className={'side-bar__wrapper col-lg-1'}
                >
                  <Share />
                </StickyBox>
                <section className={'single-post__content'}>
                  <Content content={post.blocks} className={'content__posts'} />
                  <NewsFooter post={post} />
                </section>
              </section>
            </div>
          </>
        ) : (
          <PostHeaderLoader />
        )}
      </main>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  news: PropTypes.object,
};

Post.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: POST,
    variables: { slug },
  });
  const news = await apolloClient.query({
    query: NEWS,
    variables: {
      cursor: null,
    },
  });

  return {
    post: data.postBy,
    news: news.data.posts,
  };
};

export default Post;
/**/
