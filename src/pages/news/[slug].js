import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import SimilarPosts from '~/components/SimilarPosts';
import SideBarPost from '~/components/Sidebar/Post';
import SidebarLoader from '~/components/Loaders/SidebarLoader';

import SimilarPostsLoader from '~/components/Loaders/SimilarPostsLoader';
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
      posts: similarResponse.data.posts,
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
    <SimilarPosts similarPosts={similar.posts.nodes} title={'Схожі новини'} />
  ) : null;

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
                {!state.news || !state.blogs ? (
                  <aside className="col-md-12">
                    <SidebarLoader type={'popular'} />
                  </aside>
                ) : (
                  <SideBarPost news={news} blogs={blogs} />
                )}
              </StickyBox>
            </div>
            {!state.similarPosts ? (
              <SimilarPostsLoader />
            ) : (
              <SimilarPosts
                similarPosts={similarPosts.nodes}
                title={'Схожі новини'}
              />
            )}
          </>
        ) : (
          <PostHeaderLoader />
        )}
      </main>
      <ArticleSingle
        post={post}
        type={'news'}
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

Post.propTypes = {
  post: PropTypes.object,
  news: PropTypes.object,
  similarPosts: PropTypes.object,
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
    post: post.data.postBy,
  };
};

export default Post;
