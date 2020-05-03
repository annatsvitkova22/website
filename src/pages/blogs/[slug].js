import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import SimilarPosts from '~/components/SimilarPosts';
import SideBarPost from '~/components/Sidebar/Post';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import ArticleSingle from '~/components/Article/Single';
import PostCardLoader from '~/components/Loaders/PostCardLoader';
import singleContentCommon from '~/lib/GraphQL/singleContentCommon';

const BLOG = gql`
  query Blog($slug: String!) {
    blogBy(slug: $slug) {
      blogId
      ${singleContentCommon}
    }
  }
`;
const SIMILAR = gql`
  query SimilarBlogs($category: String) {
    blogs(first: 6, where: { categoryName: $category }) {
      nodes {
        author {
          nicename
          lastName
          firstName
          nickname
          username
          name
          slug
        }
        id
        title
        slug
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
        slug
        author {
          name
          slug
        }
      }
    }
  }
`;

const Blog = (props) => {
  const [state, setState] = useState({
    post: props.post,
    isLoading: false,
    isSimilarLoading: false,
  });

  const [additionalInfo, setAdditionalInfo] = useState({});
  const [similar, setSimilar] = useState({
    posts: undefined,
    loading: false,
  });

  const { post, isLoading } = state;
  const { news, blogs } = additionalInfo;

  moment.locale('uk');

  useEffect(() => {
    async function loadData() {
      if (!isLoading) {
        setState({
          ...state,
          isLoading: true,
        });
      }

      const postResponse = await apolloClient.query({
        query: BLOG,
        variables: {
          slug: props.slug,
        },
      });

      setState({
        ...state,
        post: postResponse.data.blogBy,
        isLoading: false,
      });
    }

    if (props.slug && !post) {
      setState({
        ...state,
        isLoading: true,
      });
      loadData();
    }

    const loadAdditionalInfo = async () => {
      const newsResponse = await apolloClient.query({
        query: NEWS,
        variables: {
          articles: 10,
          cursor: null,
        },
      });
      const blogsResponse = await apolloClient.query({
        query: BLOGS,
      });

      setAdditionalInfo({
        news: newsResponse.data.posts,
        blogs: blogsResponse.data.blogs,
      });
    };

    if (!news && !blogs) {
      loadAdditionalInfo();
    }
  }, []);

  const loadSimilarPosts = async () => {
    if (similar.posts) return;

    setSimilar({
      ...similar,
      loading: true,
    });

    const similarResponse = await apolloClient.query({
      query: SIMILAR,
      variables: {
        category: null,
      },
    });

    setSimilar({
      posts: similarResponse.data.blogs,
      loading: false,
    });
  };

  const sidebar =
    news && blogs ? (
      <SideBarPost news={news} blogs={blogs} />
    ) : (
      <SidebarLoader className={'full-width'} type={'popular'} />
    );
  const similarPosts = similar.posts ? (
    <SimilarPosts similarPosts={similar.posts.nodes} title={'Схожі'} />
  ) : null;

  return (
    <>
      <ArticleSingle
        post={post}
        type={'blog'}
        hasShare={true}
        sidebar={sidebar}
        similarPosts={similarPosts}
      />
      {!similar.posts && (
        <>
          <Waypoint onEnter={loadSimilarPosts} />
          <div className="posts-similar posts-similar--loading posts-similar--news">
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
        </>
      )}
    </>
  );
};

Blog.propTypes = {
  post: PropTypes.object,
  news: PropTypes.object,
  similarPosts: PropTypes.object,
};

Blog.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const post = await apolloClient.query({
    query: BLOG,
    variables: { slug },
  });
  return {
    post: post.data.blogBy,
  };
};

export default Blog;
