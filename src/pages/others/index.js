import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import apolloClient from '~/lib/ApolloClient';
import Article from '~/components/Article';
import OpportunitiesLoader from '~/components/Loaders/OpportunitiesLoader';

const OTHERS_ARCHIVE = gql`
  query OthersArchive($cursor: String) {
    others(first: 5, before: $cursor) {
      nodes {
        featuredImage {
          sourceUrl(size: THUMBNAIL)
        }
        title
        slug
        id
        zmAfishaACF {
          eventAddress {
            streetAddress
            streetName
            latitude
            longitude
          }
          eventTime
          eventDays {
            day
          }
        }
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const OthersArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    OTHERS_ARCHIVE,
    props,
    'others'
  );

  if (!state.data.nodes) {
    return (
      <div className="opportunities-page">
        <div className="container articles-container articles-container--sm">
          <OpportunitiesLoader />
          <OpportunitiesLoader />
          <OpportunitiesLoader />
          <OpportunitiesLoader />
          <OpportunitiesLoader />
        </div>
      </div>
    );
  }

  const { nodes, pageInfo } = state.data;

  return (
    <div className="opportunities-page">
      <Head>
        <title>ЗМІСТ - Інше</title>
      </Head>

      <main>
        <div className="container articles-container articles-container--sm">
          {nodes.map((post, i) => (
            <>
              <Article type="others" post={post} key={post.id}>
                {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                  <Waypoint onEnter={fetchingContent} />
                )}
              </Article>
            </>
          ))}
          {state.isLoading && <OpportunitiesLoader />}
        </div>
      </main>
    </div>
  );
};

OthersArchive.propTypes = {
  others: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      cursor: PropTypes.string,
    })
  ),
};

OthersArchive.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }

  const { data } = await apolloClient.query({
    query: OTHERS_ARCHIVE,
    variables: {
      cursor: null,
    },
  });

  const { others } = data;

  return others;
};

export default OthersArchive;
