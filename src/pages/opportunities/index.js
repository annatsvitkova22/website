import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import apolloClient from '~/lib/ApolloClient';
import Article from '~/components/Article';
import NewsLoader from '~/components/Loaders/NewsLoader';

const OPPORTUNITIES_ARCHIVE = gql`
  query OpportunitiesArchive($cursor: String) {
    opportunities(first: 3, before: $cursor) {
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

const OpportunitiesArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    OPPORTUNITIES_ARCHIVE,
    props,
    'opportunities'
  );

  if (!state.data.nodes)
    return (
      <div style={{ margin: '0 auto' }}>
        <NewsLoader />
        <NewsLoader />
      </div>
    );

  const { nodes, pageInfo } = state.data;

  return (
    <div className="opportunities-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container articles-container-sm">
          {nodes.map((post, i) => (
            <>
              <Article type="opportunities" post={post} key={post.id}>
                {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                  <Waypoint onEnter={fetchingContent} />
                )}
              </Article>
            </>
          ))}
          {state.isLoading && <NewsLoader />}
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
