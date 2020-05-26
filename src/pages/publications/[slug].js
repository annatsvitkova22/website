import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import singleContentCommon from '~/lib/GraphQL/singleContentCommon';
import SimilarPosts from '~/components/SimilarPosts';
import ArticleSingle from '~/components/Article/Single';
import PostCardLoader from '~/components/Loaders/PostCardLoader';

const PUBLICATION = gql`
  query Publication($slug: String!) {
    publicationBy(slug: $slug) {
      publicationId
      zmPublicationsACF {
        bannerstyle
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

  const { post } = state;

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
    setPId([...pId, String(post.publicationId)]);
  }, []);

  return (
    <>
      <React.Fragment key={post.publicationId}>
        <ArticleSingle
          post={post}
          type={'publications'}
          hasShare={true}
          similarPosts={similarPosts}
          loadNewArticle={loadNewArticle}
          postId={post.publicationId}
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
            <React.Fragment key={item.publicationId}>
              <ArticleSingle
                type={'publications'}
                hasShare={true}
                post={item}
                postId={item.publicationId}
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

Publication.propTypes = {
  publication: PropTypes.object,
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
