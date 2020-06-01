import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Waypoint } from 'react-waypoint';
import * as classnames from 'classnames';

import apolloClient from '~/lib/ApolloClient';
import SimilarPosts from '~/components/SimilarPosts';
import SideBarPost from '~/components/Sidebar/Post';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import ArticleSingle from '~/components/Article/Single';
import PostCardLoader from '~/components/Loaders/PostCardLoader';
import singleContentCommon from '~/lib/GraphQL/singleContentCommon';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';

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
          slug
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

const NEWBLOG = gql`
  query Blog ($publId: [ID]){
    blogs(first: 1, where: {notIn: $publId}) {
      nodes {
        blogId
        ${singleContentCommon}
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
  const [loaded, setLoaded] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [pId, setPId] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledNew, setDisabledNew] = useState({});

  // TODO: add loader when navigate between blogs
  const { post } = state;
  const { news, blogs, publications } = additionalInfo;

  const loadData = async () => {
    setState({
      ...state,
      isLoading: true,
    });

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
  };

  useEffect(() => {
    if (loaded && post && props.slug) {
      loadData();
    }
  }, [props.slug]);

  moment.locale('uk');

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

    if (!news && !blogs) {
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
      posts: similarResponse.data.blogs,
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
    <SimilarPosts similarPosts={similar.posts.nodes} title={'Схожі'} />
  ) : null;

  const loadNewArticle = async () => {
    async function loadNewPosts() {
      const response = await apolloClient.query({
        query: NEWBLOG,
        variables: {
          publId: pId,
        },
      });

      setPId([...pId, String(response.data.blogs.nodes[0].blogId)]);
      setNewPosts([...newPosts, response.data.blogs.nodes[0]]);
    }
    loadNewPosts();
  };

  useEffect(() => {
    if (post) setPId([...pId, String(post.blogId)]);
  }, [post]);

  if (!post || !sidebar) {
    return (
      <>
        <div className="main-container">
          <div className="single-post single-post--news container">
            <>
              <div className="row">
                <div
                  className={classnames({
                    'col-xl-9': sidebar,
                    'col-12': !sidebar,
                  })}
                >
                  <div className="single-post__block-wrapper ">
                    <PostHeaderLoader type={'news'} />
                  </div>
                </div>
                <aside className="col-md-3">{sidebar}</aside>
              </div>
            </>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {post && post.blogId && (
        <React.Fragment key={post.blogId}>
          <ArticleSingle
            post={post}
            type={'blogs'}
            hasShare={true}
            sidebar={sidebar}
            similarPosts={similarPosts}
            postId={post.blogId}
          />
          <Waypoint
            onEnter={
              disabled
                ? undefined
                : () => {
                    setDisabled(true);
                    loadNewArticle();
                  }
            }
          />
        </React.Fragment>
      )}
      {!similar.posts && post && (
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
        newPosts.map((item, index) => {
          return (
            <React.Fragment key={item.blogId}>
              <ArticleSingle
                type={'blogs'}
                hasShare={true}
                post={item}
                postId={item.blogId}
                sidebar={sidebar}
              />
              <Waypoint
                topOffset={'-300%'}
                bottomOffset={'-300%'}
                key={index}
                onEnter={
                  disabledNew[index]
                    ? undefined
                    : () => {
                        setDisabledNew({ ...disabledNew, [index]: true });
                        loadNewArticle();
                      }
                }
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
    slug,
    post: post.data.blogBy,
  };
};

export default Blog;
