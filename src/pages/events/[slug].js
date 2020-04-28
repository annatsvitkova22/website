import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import StickyBox from 'react-sticky-box';

import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import apolloClient from '~/lib/ApolloClient';
import Content from '~/components/Content';
import EventsLikeSidebar from '~/components/Sidebar/Events';
import EventHeader from '~/components/EventHeader';

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
        }
      }
    }
  }
`;

const Event = (props) => {
  const { event } = props;
  const [sideBarOpen, setSideBarOpen] = useState(false);

  console.log(event);
  const sideBarCls = classNames({
    'sidebar-active': sideBarOpen,
  });

  const handleScroll = () => {
    if (window.scrollY > 800) {
      setSideBarOpen(true);
    }
    if (window.scrollY < 800) {
      setSideBarOpen(false);
    }
  };

  const [useStyles, setUseStyles] = useState({});
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (event.featuredImage) {
      const styles = {
        backgroundImage: `url(${event.featuredImage.mediaItemUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        color: 'white',
      };
      setUseStyles(styles);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="single__event">
      <Head>
        <title>{event.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="event container">
        <div className="event__wrapper row no-gutters">
          <div className="event__background" style={useStyles}>
            {event.featuredImage ? (
              <div className="event__overlay">
                <EventHeader event={event} />
                <div className="event__info-card">
                  <EventsLikeSidebar data={event.zmAfishaACF} />
                </div>
              </div>
            ) : (
              <>
                <EventHeader event={event} />
                <div className="event__info-card">
                  <EventsLikeSidebar data={event.zmAfishaACF} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="event__wrapper row no-gutters">
          <div className="event__content-wrapper col-xl-8">
            <div className="event__content">
              <Content content={event.blocks} className="event__content-main" />
            </div>
          </div>
          <StickyBox
            offsetTop={20}
            offsetBottom={20}
            style={{ height: 'fit-content', width: '100%', maxWidth: '344px' }}
          >
            <div
              className={`event__info-card event__sticky-sidebar ${sideBarCls}`}
            >
              <EventsLikeSidebar data={event.zmAfishaACF} />
            </div>
          </StickyBox>
        </div>
      </main>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
};

Event.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: EVENT,
    variables: { slug },
  });

  return {
    event: data.eventBy,
  };
};

export default Event;
