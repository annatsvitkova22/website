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
  const [disabled, setDisabled] = useState(false);
  const [disabledNew, setDisabledNew] = useState({});
  const [newPosts, setNewPosts] = useState([]);
  const [pId, setPId] = useState([]);

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
    if (post && props.slug) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (post) setPId([...pId, String(post.postId)]);
  }, [post]);

  if (!post || !sidebar) {
    return (
      <>
        <div className="main-container">
          <div className={' single-post single-post--news container'}>
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
                <aside className={'col-md-3'}>{sidebar}</aside>
              </div>
            </>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {post && post.postId && (
        <React.Fragment key={post.postId}>
          <ArticleSingle
            post={post}
            type={'news'}
            hasShare={true}
            sidebar={sidebar}
            similarPosts={similarPosts}
            postId={post.postId}
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
            <div className="loader-container__desktop">
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
            <div
              className="loader-container__mobile"
              style={{ width: '100%', marginLeft: '0', padding: '0 20px' }}
            >
              <PostCardLoader type={'mobile'} />
              <PostCardLoader type={'mobile'} />
              <PostCardLoader type={'mobile'} />
              <PostCardLoader type={'mobile'} />
              <PostCardLoader type={'mobile'} />
              <PostCardLoader type={'mobile'} />
            </div>
          </div>
        </>
      )}

      {newPosts.length > 0 ? (
        newPosts.map((item, index) => {
          return (
            <React.Fragment key={item.postId}>
              <ArticleSingle
                type={'news'}
                hasShare={true}
                post={item}
                postId={item.postId}
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
        })
      ) : (
        <>
          <div className="main-container">
            <div className={' single-post single-post--news container'}>
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
                  <aside className={'col-md-3'}>{sidebar}</aside>
                </div>
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Post.propTypes = {
  props: PropTypes.any,
  slug: PropTypes.any,
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
