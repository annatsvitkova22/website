import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { Waypoint } from 'react-waypoint';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import PostCardLoader from '~/components/Loaders/PostCardLoader';
import Article from '~/components/Article';

const CROWDFUNDINGS_ARCHIVE = gql`
  query CrowdfundingsArchive($articles: Int, $cursor: String) {
    crowdfundings(first: $articles, before: $cursor) {
      nodes {
        id
        excerpt
        content
        uri
        title
        slug
        date
        author {
          id
          name
          nicename
          nickname
          username
        }
        featuredImage {
          mediaItemUrl
        }
        cfACF {
          tocollect
          expiration
          collected
        }
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const CrowdfundingsArchive = ({ crowdfundings }) => {
  const variables = {
    articles: 9,
    onLoadNumber: 3,
    cursor: null,
  };

  const { fetchingContent, state } = useLoadMoreHook(
    CROWDFUNDINGS_ARCHIVE,
    crowdfundings,
    'crowdfundings',
    variables.articles,
    variables.onLoadNumber
  );

  const {
    data: { nodes, pageInfo },
    isLoading,
  } = state;

  if (!nodes) {
    return (
      <div className="container">
        <div className="crowdfundings-archive">
          <main className="row crowdfundings-archive__articles">
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
            <div className="col-md-4">
              <PostCardLoader type="small" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="crowdfundings-page">
      <Head>
        <title>ЗМІСТ - Збір Коштів</title>
      </Head>

      <div className="container">
        <div className="crowdfundings-archive">
          <main className="row crowdfundings-archive__articles">
            {nodes.map((crowdfunding, i) => {
              return (
                <div className="col-md-4" key={crowdfunding.id}>
                  <Article type={'crowdfundings'} post={crowdfunding}>
                    {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                      <Waypoint onEnter={fetchingContent} />
                    )}
                  </Article>
                </div>
              );
            })}
            {isLoading && (
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4">
                    <PostCardLoader type="small" />
                  </div>
                  <div className="col-md-4">
                    <PostCardLoader type="small" />
                  </div>
                  <div className="col-md-4">
                    <PostCardLoader type="small" />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

CrowdfundingsArchive.propTypes = {
  crowdfundings: PropTypes.object,
};

CrowdfundingsArchive.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }

  const variables = {
    articles: 9,
    cursor: null,
  };

  const { data } = await apolloClient.query({
    query: CROWDFUNDINGS_ARCHIVE,
    variables,
  });

  const { crowdfundings } = data;

  return { crowdfundings };
};

export default CrowdfundingsArchive;
