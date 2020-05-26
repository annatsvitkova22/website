import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import CrowdfundingSingle from '~/components/Article/Crowdfunding';
import ActionbarLoader from '~/components/Loaders/ActionbarLoader';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';
import SidebarLoader from '~/components/Loaders/SidebarLoader';

export const CROWDFUNDING = gql`
  query Crowdfunding($slug: String!) {
    crowdfundingBy(slug: $slug) {
      ${gutenbergBlocksQuery}
      content
      id
      crowdfundingId
      title
      slug
      date
      statisticsACF {
        views
      }
      author {
        id
        name
        nicename
        nickname
        username
        avatar {
          url
        }
      }
      featuredImage {
        mediaItemUrl
      }
      cfACF {
        tocollect
        expiration
        collected
        shared
        supported {
          name
          sum
          date
          photo {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

const Crowdfunding = (props) => {
  const [state, setState] = useState({
    post: props.post,
  });

  const { post, isLoading } = state;

  useEffect(() => {
    async function loadData() {
      if (!isLoading) {
        setState({
          ...state,
          isLoading: true,
        });
      }

      const postResponse = await apolloClient.query({
        query: CROWDFUNDING,
        variables: {
          slug: props.slug,
        },
      });

      setState({
        ...state,
        post: postResponse.data.crowdfundingBy,
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
  }, []);

  if (!post) {
    return (
      <div className="container">
        <div className="crowdfunding-single">
          <div className="row">
            <div className="col-12 crowdfunding-single__top">
              <ActionbarLoader />
              <ActionbarLoader />
            </div>
            <main className="col-md-8 crowdfunding-single__main">
              <PostHeaderLoader type="crowdfunding" />
            </main>
            <aside className="col-md-4 crowdfunding-single__sidebar">
              <SidebarLoader className="full-width" type="popular" />
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>{post && post.crowdfundingId && <CrowdfundingSingle post={post} />}</>
  );
};

Crowdfunding.propTypes = {
  crowdfunding: PropTypes.object,
};

Crowdfunding.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const { data } = await apolloClient.query({
    query: CROWDFUNDING,
    variables: { slug },
  });

  return {
    post: data.crowdfundingBy,
  };
};

export default Crowdfunding;
