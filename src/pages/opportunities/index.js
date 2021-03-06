import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import apolloClient from '~/lib/ApolloClient';
import Article from '~/components/Article';
import OpportunitiesLoader from '~/components/Loaders/OpportunitiesLoader';

const OPPORTUNITIES_ARCHIVE = gql`
  query OpportunitiesArchive($cursor: String) {
    opportunities(first: 5, before: $cursor) {
      nodes {
        featuredImage {
          mediaItemUrl
          zm_xss_square: sourceUrl(size: ZM_XSS_SQUARE)
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

const OpportunitiesArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    OPPORTUNITIES_ARCHIVE,
    props,
    'opportunities'
  );

  if (!state.data.nodes) {
    return (
      <div className="opportunities-page">
        <div className="container articles-container articles-container--sm">
          <div className="loader-container__desktop">
            <div className="article--opportunities article">
              <OpportunitiesLoader />
            </div>
            <div className="article--opportunities article">
              <OpportunitiesLoader />
            </div>
            <div className="article--opportunities article">
              <OpportunitiesLoader />
            </div>
            <div className="article--opportunities article">
              <OpportunitiesLoader />
            </div>
          </div>
          <div className="loader-container__mobile">
            <OpportunitiesLoader type={'mobile'} />
            <OpportunitiesLoader type={'mobile'} />
            <OpportunitiesLoader type={'mobile'} />
            <OpportunitiesLoader type={'mobile'} />
            <OpportunitiesLoader type={'mobile'} />
          </div>
        </div>
      </div>
    );
  }

  const { nodes, pageInfo } = state.data;

  return (
    <div className="opportunities-page">
      <Head>
        <title>ЗМІСТ - Можливості</title>
      </Head>

      <main>
        <div className="container articles-container articles-container--sm">
          {nodes.map((post, i) => (
            <>
              <Article type="opportunities" post={post} key={post.id}>
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

OpportunitiesArchive.propTypes = {
  opportunities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      cursor: PropTypes.string,
    })
  ),
};

OpportunitiesArchive.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }

  const { data } = await apolloClient.query({
    query: OPPORTUNITIES_ARCHIVE,
    variables: {
      cursor: null,
    },
  });

  const { opportunities } = data;

  return opportunities;
};

export default OpportunitiesArchive;
