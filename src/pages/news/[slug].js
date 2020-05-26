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

const POST = gql`
  query Post($slug: String!) {
    postBy(slug: $slug) {
      postId
      ${singleContentCommon}
    }
  }
`;
const SIMILAR = gql`
  query SimilarPosts($category: String) {
    posts(first: 6, where: { categoryName: $category }) {
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
        slug
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
        }
      }
    }
  }
`;

const PUBLICATIONS = gql`
  query Publications {
    publications(first: 4) {
      nodes {
        title
        link
        slug
        featuredImage {
          mediaItemUrl
          title
        }
      }
    }
  }
`;

const NEWPOST = gql`
  query Post ($publId: [ID]){
    posts(first: 1, where: {notIn: $publId}) {
      nodes {
        postId
        ${singleContentCommon}
      }
    }
  }
`;

const Post = (props) => {
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
  const [loaded, setLoaded] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [pId, setPId] = useState([]);

  // TODO: add loader when navigate between news

  const { post } = state;
  const { news, blogs, publications } = additionalInfo;

  moment.locale('uk');

  const loadData = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    const postResponse = await apolloClient.query({
      query: POST,
      variables: {
        slug: props.slug,
      },
    });

    setState({
      ...state,
      post: postResponse.data.postBy,
      isLoading: false,
    });
  };

  useEffect(() => {
    if (loaded && post && props.slug) {
      loadData();
    }
  }, [props.slug]);

  useEffect(() => {
    if (props.slug && !post) {
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
      const publicationsResponse = await apolloClient.query({
        query: PUBLICATIONS,
      });

      setAdditionalInfo({
        news: newsResponse.data.posts,
        blogs: blogsResponse.data.blogs,
        publications: publicationsResponse.data.publications,
      });
    };

    if (!news && !blogs && !publications) {
      loadAdditionalInfo();
    }

    setLoaded(true);
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
      posts: similarResponse.data.posts,
      loading: false,
    });
  };

  const sidebar =
    news && blogs ? (
      <SideBarPost news={news} blogs={blogs} publications={publications} />
    ) : (
      <SidebarLoader className={'full-width'} type={'popular'} />
    );
  const similarPosts = similar.posts ? (
    <SimilarPosts similarPosts={similar.posts.nodes} title={'Схожі новини'} />
  ) : null;

  const loadNewArticle = async () => {
    async function loadNewPosts() {
      const response = await apolloClient.query({
        query: NEWPOST,
        variables: {
          publId: pId,
        },
      });

      setPId([...pId, String(response.data.posts.nodes[0].postId)]);
      setNewPosts([...newPosts, response.data.posts.nodes[0]]);
    }
    loadNewPosts();
  };

  useEffect(() => {
    setPId([...pId, String(post.postId)]);
  }, []);

  return (
    <>
      <React.Fragment key={post.postId}>
        <ArticleSingle
          post={post}
          type={'news'}
          hasShare={true}
          sidebar={sidebar}
          similarPosts={similarPosts}
          postId={post.postId}
        />
      </React.Fragment>
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
      {newPosts.length &&
        newPosts.map((item) => {
          return (
            <React.Fragment key={item.postId}>
              <ArticleSingle
                type={'news'}
                hasShare={true}
                post={item}
                postId={item.postId}
                sidebar={sidebar}
              />
            </React.Fragment>
          );
        })}
      <Waypoint
        onEnter={() => {
          loadNewArticle();
        }}
      />
    </>
  );
};

Post.propTypes = {
  props: PropTypes.object,
};

Post.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const post = await apolloClient.query({
    query: POST,
    variables: { slug },
  });

  return {
    slug,
    post: post.data.postBy,
  };
};

export default Post;
