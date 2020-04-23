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
import SimilarPosts from '~/components/SimilarPosts';

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
      id
      comments {
        pageInfo {
          total
        }
      }
      author {
        nicename
        lastName
        firstName
        nickname
        username
        name
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
const SIMILAR = gql`
  query SimilarPosts($nicename: String) {
    posts(first: 7, where: { authorName: $nicename }) {
      nodes {
        author {
          firstName
          lastName
          name
        }
        id
        title
        featuredImage {
          link
          mediaItemUrl
        }
      }
    }
  }
`;
const NEWS = gql`
  query News($cursor: String, $articles: Int) {
    posts(first: $articles, before: $cursor) {
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

const Post = ({ post, news, similarPosts }) => {
  const ref = React.useRef();

  console.log(post.author);
  const filteredSimilarPost = similarPosts.nodes.filter(
    (node) => node.id !== post.id
  );

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
        articles: 3,
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
              <div className={'single-post__wrapper col-xl-9 col-12'}>
                <NewsHead post={post} />
                <FeaturedImage data={post.featuredImage} />
              </div>
              <StickyBox
                offsetTop={70}
                offsetBottom={20}
                className={'side-bar__wrapper col-xl-3'}
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

              <section className={'single-post__main col-xl-9 col-12'}>
                <StickyBox
                  offsetTop={70}
                  offsetBottom={20}
                  className={'side-bar__wrapper col-xl-1'}
                >
                  <Share />
                </StickyBox>
                <section className={'single-post__content'}>
                  <Content content={post.blocks} className={'content__posts'} />
                  <NewsFooter post={post} />
                </section>
              </section>
            </div>
            <SimilarPosts similarPosts={filteredSimilarPost} />
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
      articles: 10,
      cursor: null,
    },
  });
  const similarPosts = await apolloClient.query({
    query: SIMILAR,
    variables: {
      nicename: data.postBy.author.nicename,
    },
  });

  return {
    post: data.postBy,
    news: news.data.posts,
    similarPosts: similarPosts.data.posts,
  };
};

export default Post;
