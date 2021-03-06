import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import apolloClient from '~/lib/ApolloClient';
import Article from '~/components/Article';
import NewsLoader from '~/components/Loaders/NewsLoader';
import PostCardLoader from '~/components/Loaders/PostCardLoader';
import Form from '~/components/Form';

const EVENTS_ARCHIVE = gql`
  query EventsArchive($cursor: String) {
    events(first: 7, before: $cursor) {
      nodes {
        featuredImage {
          mediaItemUrl
          zm_xs_rect: sourceUrl(size: ZM_XS_RECT)
        }
        title
        slug
        id
        zmAfishaACF {
          eventAddress {
            city
            streetName
            streetNumber
          }
          eventTime
          eventDate
        }
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const EventsArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    EVENTS_ARCHIVE,
    props,
    'events'
  );

  if (!state.data.nodes)
    return (
      <div className="events-page">
        <main>
          <div className="container articles-container">
            <div className="row">
              <div className="loader-container__desktop">
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="event" />
                </div>
              </div>
              <div className="loader-container__mobile">
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="small" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="small" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="small" />
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <PostCardLoader type="small" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );

  const { nodes, pageInfo } = state.data;

  return (
    <div className="events-page">
      <Head>
        <title>ЗМІСТ - Афіша</title>
      </Head>

      <main>
        <div className="container articles-container">
          <div className="row">
            {nodes.map((post, i) =>
              i === 3 ? (
                <React.Fragment key={i}>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Form id={1} className="zm-form--event" />
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Article type="events" post={post}>
                      {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                        <Waypoint onEnter={fetchingContent} />
                      )}
                    </Article>
                  </div>
                </React.Fragment>
              ) : (
                <div className="col-lg-3 col-sm-6 col-12" key={i}>
                  <Article type="events" post={post} key={post.id}>
                    {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                      <Waypoint onEnter={fetchingContent} />
                    )}
                  </Article>
                </div>
              )
            )}
            {state.isLoading && <NewsLoader />}
          </div>
        </div>
      </main>
    </div>
  );
};

EventsArchive.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

EventsArchive.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }

  const { data } = await apolloClient.query({
    query: EVENTS_ARCHIVE,
    variables: {
      cursor: null,
    },
  });

  const { events } = data;

  return events;
};

export default EventsArchive;
