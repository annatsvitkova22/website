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

const OPPORTUNITY = gql`
  query Opportunity($slug: String!) {
    opportunityBy(slug: $slug) {
      title
      ${gutenbergBlocksQuery}
      excerpt
      featuredImage {
        mediaItemUrl
        title
      }
      zmAfishaACF {
        eventTime
        eventDate
        eventSocials {
          socialUrl
          icon
        }
        eventDays {
          day
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

const Opportunity = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [state, setState] = useState({
    opportunity: props.opportunity,
    isLoading: false,
    isSimilarLoading: false,
  });

  const { opportunity, isLoading } = state;

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

      const opportunityResponse = await apolloClient.query({
        query: OPPORTUNITY,
        variables: {
          slug: props.slug,
        },
      });

      setState({
        ...state,
        opportunity: opportunityResponse.data.opportunityBy,
        isLoading: false,
      });
    }
    if (props.slug && !opportunity) {
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

  if (!opportunity) {
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
        <title>ЗМІСТ - {opportunity.title}</title>
      </Head>

      <main className="event">
        <div className="container">
          <section
            className="event__hero"
            style={{
              backgroundImage: `url(${
                opportunity.featuredImage
                  ? opportunity.featuredImage.mediaItemUrl
                  : ''
              })`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div
              className={
                opportunity.featuredImage
                  ? 'event__hero-overlay'
                  : 'event__hero-noimage'
              }
            >
              <div className="event__hero-inner container">
                <EventHeader event={opportunity} withList={true} />
                <div className="event__info-card">
                  <EventsLikeSidebar data={opportunity.zmAfishaACF} />
                </div>
              </div>
            </div>
          </section>
          <section className="event__main container">
            <div className="event__content-wrapper">
              <div className="event__content">
                <Content
                  content={opportunity.blocks}
                  className="event__content-main"
                />
              </div>
            </div>
            <StickyBox
              className={'event__sticky-wrapper'}
              offsetTop={100}
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
                <EventsLikeSidebar
                  data={opportunity.zmAfishaACF}
                  withList={true}
                />
              </div>
            </StickyBox>
          </section>
        </div>
      </main>
    </div>
  );
};

Opportunity.propTypes = {
  opportunity: PropTypes.object,
};

Opportunity.getInitialProps = async ({ query: { slug } }) => {
  if (process.browser) {
    return { slug };
  }

  const opportunity = await apolloClient.query({
    query: OPPORTUNITY,
    variables: { slug },
  });

  return {
    opportunity: opportunity.data.opportunityBy,
  };
};

export default Opportunity;
