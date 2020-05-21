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
import EventMainLoader from '~/components/Loaders/EventMainLoader';

const OTHER = gql`
  query Other($slug: String!) {
    otherBy(slug: $slug) {
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

const Other = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [state, setState] = useState({
    other: props.other,
    isLoading: false,
    isSimilarLoading: false,
  });

  const { other, isLoading } = state;

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

  useEffect(() => {
    async function loadData() {
      if (!isLoading) {
        setState({
          ...state,
          isLoading: true,
        });
      }

      const otherResponse = await apolloClient.query({
        query: OTHER,
        variables: {
          slug: props.slug,
        },
      });

      setState({
        ...state,
        other: otherResponse.data.otherBy,
        isLoading: false,
      });
    }
    if (props.slug && !other) {
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

  if (!other) {
    return (
      <div className="single__event">
        <div className="container">
          <EventMainLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="single__event">
      <Head>
        <title>ЗМІСТ - {other.title}</title>
        {other &&
          other.featuredImage &&
          other.featuredImage.mediaItemUrl && (
            <>
              <meta
                property="twitter:image"
                content={other.featuredImage.mediaItemUrl}
              />
              <meta
                property="og:image"
                content={other.featuredImage.mediaItemUrl}
              />
            </>
          )}
      </Head>

      <main className="event">
        <div className="container">
          <section
            className="event__hero"
            style={{
              backgroundImage: `url(${
                other.featuredImage ? other.featuredImage.mediaItemUrl : ''
              })`,
            }}
          >
            <div
              className={
                other.featuredImage
                  ? 'event__hero-overlay'
                  : 'event__hero-noimage'
              }
            >
              <div className="event__hero-inner container">
                <EventHeader event={other} withList={true} />
                <div className="event__info-card">
                  <EventsLikeSidebar data={other.zmAfishaACF} />
                </div>
              </div>
            </div>
          </section>
          <section className="event__main container">
            <div className="event__content-wrapper">
              <div className="event__content">
                <Content
                  content={other.blocks}
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
                <EventsLikeSidebar data={other.zmAfishaACF} withList={true} />
              </div>
            </StickyBox>
          </section>
        </div>
      </main>
    </div>
  );
};

Other.propTypes = {
  opportunity: PropTypes.object,
};

Other.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const other = await apolloClient.query({
    query: OTHER,
    variables: { slug },
  });

  return {
    other: other.data.otherBy,
  };
};

export default Other;
