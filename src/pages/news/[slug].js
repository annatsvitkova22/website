import React, { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createStateLink, useStateLink } from '@hookstate/core';

import { PostStore } from '~/stores/Post';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import apolloClient from '~/lib/ApolloClient';
import NewsHead from '~/components/NewsHead';
import Share from '~/components/ShareSideBar';
import NewsFooter from '~/components/NewsFooter';
import Content from '~/components/Content';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import FeaturedImage from '~/components/FeaturedImage';
import SimilarPosts from '~/components/SimilarPosts';
import ArticleAuthor from '~/components/Article/Author';
import ShareItems from '~/components/ShareItems';
import SideBarPost from '~/components/Sidebar/Post';

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
  query SimilarPosts($category: String) {
    posts(first: 7, where: { categoryName: $category }) {
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
const BLOGS = gql`
  query Blogs {
    blogs(first: 4) {
      nodes {
        link
        title
        author {
          name
        }
      }
    }
  }
`;

const Post = ({ post, news, similarPosts, blogs }) => {
  moment.locale('uk');
  const [similar, setSimilar] = useState(
    similarPosts.nodes ? similarPosts.nodes : null
  );

  useEffect(() => {
    if (similarPosts.nodes) {
      const filteredSimilarPost = similarPosts.nodes.filter(
        (node) => node.id !== post.id
      );
      if (filteredSimilarPost.length > 6) {
        setSimilar(filteredSimilarPost.splice(6));
      }
      setSimilar(filteredSimilarPost);
    }
  }, []);

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
                <section className={'single-post__main col-12'}>
                  <StickyBox
                    offsetTop={70}
                    offsetBottom={20}
                    className={'side-bar__wrapper col-xl-1'}
                  >
                    <Share />
                  </StickyBox>
                  <section className={'single-post__content'}>
                    <div className={'title__socials'}>
                      <div className={'title__socials-about'}>
                        <span className="title__socials-image" />
                        <div className={'title__socials-author'}>
                          <ArticleAuthor
                            author={post.author}
                            className={'title__socials-name'}
                          />
                          <span className={'title__socials-date'}>
                            {moment(post.date).format('LLL')}
                          </span>
                        </div>
                      </div>
                      <ShareItems className={'title__socials-items'} />
                    </div>
                    <article
                      className={'title__description'}
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <Content
                      content={post.blocks}
                      className={'content__posts'}
                    />
                    <NewsFooter post={post} />
                  </section>
                </section>
              </div>
              <StickyBox
                offsetTop={118}
                offsetBottom={20}
                className={'sidebar__wrapper col-xl-3'}
              >
                <SideBarPost news={news} blogs={blogs} />
              </StickyBox>
            </div>
            <SimilarPosts similarPosts={similar} />
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
  similarPosts: PropTypes.object,
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
      category: data.postBy.categories.nodes[0].name,
    },
  });
  const blogs = await apolloClient.query({
    query: BLOGS,
  });

  return {
    post: data.postBy,
    news: news.data.posts,
    similarPosts: similarPosts.data.posts,
    blogs: blogs.data.blogs,
  };
};

export default Post;
