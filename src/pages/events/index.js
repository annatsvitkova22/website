import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import apolloClient from '~/lib/ApolloClient';
import Article from '~/components/Article';
import NewsLoader from '~/components/Loaders/NewsLoader';
import EventsForm from '~/components/EventsForm';
import PostCardLoader from '~/components/Loaders/PostCardLoader';

const EVENTS_ARCHIVE = gql`
  query EventsArchive($cursor: String) {
    events(first: 7, before: $cursor) {
      nodes {
        featuredImage {
          mediaItemUrl
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
          </div>
        </main>
      </div>
    );

  const { nodes, pageInfo } = state.data;

  return (
    <div className="events-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Афіша'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container articles-container">
          <div className="row">
            {nodes.map((post, i) =>
              i === 3 ? (
                <>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <EventsForm
                      personText="Контактна особа"
                      phoneText="Телефон"
                      nameText="Назва"
                      dateText="Дата"
                      descText="Опис Події"
                      submitText="Запропонувати"
                      className="zm-form--event"
                    />
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Article type="events" post={post} key={post.id}>
                      {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                        <Waypoint onEnter={fetchingContent} />
                      )}
                    </Article>
                  </div>
                </>
              ) : (
                <div className="col-lg-3 col-sm-6 col-12">
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
    return { };
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
