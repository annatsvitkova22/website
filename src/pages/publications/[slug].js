import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import getConfig from 'next/config';
import { useRouter } from 'next/router';

import apolloClient from '~/lib/ApolloClient';
import singleContentCommon from '~/lib/GraphQL/singleContentCommon';
import SimilarPosts from '~/components/SimilarPosts';
import ArticleSingle from '~/components/Article/Single';
import PostCardLoader from '~/components/Loaders/PostCardLoader';
import PublicationSingleLoader from '~/components/Loaders/PublicationSingleLoader';

const PUBLICATION = gql`
  query Publication($slug: String!) {
    publicationBy(slug: $slug) {
      publicationId
      zmPublicationsACF {
        bannerstyle
      }
      zmBrandedPublication {
        logo {
          mediaItemUrl
          title
        }
      }
      ${singleContentCommon}
    }
  }
`;

const SIMILAR = gql`
  query Similar {
    publications(first: 6) {
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

const NEWPUBLICATION = gql`
  query Publication ($publId: [ID]){
    publications(first: 1, where: {notIn: $publId}) {
      nodes {
        publicationId
        zmPublicationsACF {
          bannerstyle
        }
        ${singleContentCommon}
      }
    }
  }
`;

const { publicRuntimeConfig } = getConfig();

const { frontUrl } = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const Publication = (props) => {
  const [state, setState] = useState({
    post: props.post,
    isLoading: false,
  });

  const [similar, setSimilar] = useState({
    posts: undefined,
    loading: false,
  });
  const [loaded, setLoaded] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [pId, setPId] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledNew, setDisabledNew] = useState({});

  const { post } = state;
  const { asPath } = useRouter();

  const loadData = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    const postResponse = await apolloClient.query({
      query: PUBLICATION,
      variables: {
        slug: props.slug,
      },
    });

    setState({
      ...state,
      post: postResponse.data.publicationBy,
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

    setLoaded(true);
    if (
      post &&
      post.zmBrandedPublication.logo &&
      post.zmBrandedPublication.logo.mediaItemUrl
    ) {
      document.querySelector('.header').classList.add('header--branded');
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
    });

    setSimilar({
      posts: similarResponse.data.publications,
      loading: false,
    });
  };

  const similarPosts = similar.posts ? (
    <SimilarPosts
      similarPosts={similar.posts.nodes}
      title={'Схожі публікації'}
    />
  ) : null;

  const loadNewArticle = async () => {
    async function loadNewPosts() {
      const response = await apolloClient.query({
        query: NEWPUBLICATION,
        variables: {
          publId: pId,
        },
      });

      setPId([
        ...pId,
        String(response.data.publications.nodes[0].publicationId),
      ]);
      setNewPosts([...newPosts, response.data.publications.nodes[0]]);
    }
    loadNewPosts();
  };

  useEffect(() => {
    if (post) {
      setPId([...pId, String(post.publicationId)]);
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <div className="loader-container__desktop">
          <PublicationSingleLoader />
        </div>
        <div className="loader-container__mobile">
          <PublicationSingleLoader type={'mobile'} />
        </div>
      </>
    );
  }

  return (
    <>
      {post && (
        <React.Fragment key={post.publicationId}>
          <ArticleSingle
            post={post}
            type={'publications'}
            hasShare={true}
            similarPosts={similarPosts}
            loadNewArticle={loadNewArticle}
            postId={post.publicationId}
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
            <React.Fragment key={item.publicationId}>
              <ArticleSingle
                type={'publications'}
                hasShare={true}
                post={item}
                postId={item.publicationId}
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
    </>
  );
};

Publication.propTypes = {
  publication: PropTypes.object,
  slug: PropTypes.string,
  post: PropTypes.any,
};

Publication.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const { data } = await apolloClient.query({
    query: PUBLICATION,
    variables: { slug },
  });

  return {
    slug,
    post: data.publicationBy,
  };
};

export default Publication;
