import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import StickyBox from 'react-sticky-box';

import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import apolloClient from '~/lib/ApolloClient';
import Content from '~/components/Content';
import EventsScene from '~/scenes/EventsScene';
import EventsLikeSidebar from '~/components/Sidebar/Events';
import EventHeader from '~/components/EventHeader';
import PostHeaderLoader from '~/components/Loaders/PostHeaderLoader';

const EVENT = gql`
  query Event($slug: String!) {
    eventBy(slug: $slug) {
      title
      ${gutenbergBlocksQuery}
      excerpt
      featuredImage {
        mediaItemUrl
        title
      }
      zmAfishaACF {
        eventCost
        eventTime
        eventDate
        eventSocials {
          socialUrl
          icon
        }
        eventAddress {
          city
          country
          streetAddress
          streetNumber
          streetName
          longitude
          latitude
          zoom
        }
        contactInfo {
          email
          person
          phoneNumber
          phoneNumberDisplay
        }
      }
    }
  }
`;

const OTHER_EVENTS = gql`
  query EventsQuery {
    events(first: 4) {
      nodes {
        id
        slug
        title
        zmAfishaACF {
          eventAddress {
            city
            streetName
            streetNumber
          }
          eventTime
          eventDate
        }
        featuredImage {
          mediaItemUrl
        }
      }
    }
  }
`;

const Event = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [state, setState] = useState({
    event: props.event,
    events: props.events,
    isLoading: false,
    isSimilarLoading: false,
  });

  const { event, events, isLoading } = state;

  const sideBarCls = classNames({
    'sidebar-active': sideBarOpen,
  });

  const handleScroll = () => {
    if (window.scrollY > 700) {
      setSideBarOpen(true);
    }
    if (window.scrollY < 700) {
      setSideBarOpen(false);
    }
  };

  const [useStyles, setUseStyles] = useState({});
  useEffect(() => {
    async function loadData() {
      if (!isLoading) {
        setState({
          ...state,
          isLoading: true,
        });
      }

      const eventResponse = await apolloClient.query({
        query: EVENT,
        variables: {
          slug: props.slug,
        },
      });

      setState({
        ...state,
        event: eventResponse.data.eventBy,
        isLoading: false,
      });
    }
    if (props.slug && !event) {
      setState({
        ...state,
        isLoading: true,
      });
      loadData();
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (state.event && state.event.featuredImage) {
      const styles = {
        backgroundImage: `url(${event.featuredImage.mediaItemUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        color: 'white',
      };
      setUseStyles(styles);
    }
  }, [state.event]);

  if (!state.event) {
    return <PostHeaderLoader type={'publication'} />;
  }

  return (
    <div className="single__event">
      <Head>
        <title>{event.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="event">
        <div className="container">
          <section className="event__hero" style={useStyles}>
            <div
              className={
                event.featuredImage
                  ? 'event__hero-overlay'
                  : 'event__hero-noimage'
              }
            >
              <div className="event__hero-inner container">
                <EventHeader event={event} />
                <div className="event__info-card">
                  <EventsLikeSidebar data={event.zmAfishaACF} />
                </div>
              </div>
            </div>
          </section>
          <section className="event__main container">
            <div className="event__content-wrapper">
              <div className="event__content">
                <Content
                  content={event.blocks}
                  className="event__content-main"
                />
              </div>
            </div>
            <StickyBox
              className={'event__sticky-wrapper'}
              offsetTop={20}
              offsetBottom={20}
              style={{
                height: 'fit-content',
                width: '100%',
                maxWidth: '344px',
              }}
            >
              <div
                className={`event__info-card event__sticky-sidebar ${sideBarCls}`}
              >
                <EventsLikeSidebar data={event.zmAfishaACF} />
              </div>
            </StickyBox>
          </section>
        </div>
        <EventsScene events={events} form={false} />
      </main>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  events: PropTypes.object,
};

Event.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const event = await apolloClient.query({
    query: EVENT,
    variables: { slug },
  });

  const events = await apolloClient.query({
    query: OTHER_EVENTS,
  });

  return {
    events: events.data.events,
    event: event.data.eventBy,
  };
};

export default Event;
