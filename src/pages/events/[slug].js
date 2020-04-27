import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import StickyBox from 'react-sticky-box';

import formatQueriesKeys from '../../util/formatQueriesKeys';

import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import apolloClient from '~/lib/ApolloClient';
import Socials from '~/components/Footer/Socials';
import Contacts from '~/components/Footer/Contacts';
import Content from '~/components/Content';
import Icons from '~/components/Icons';

const EVENT = gql`
  query Event($slug: String!) {
    eventBy(slug: $slug) {
      title
      ${gutenbergBlocksQuery}
      excerpt
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
  console.log(event);

  const newSocialData = event.zmAfishaACF.eventSocials
    ? event.zmAfishaACF.eventSocials.map((item) => {
        return formatQueriesKeys(item, { socialUrl: 'url', icon: 'name' });
      })
    : null;
  const newContactData = event.zmAfishaACF.contactInfo
    ? event.zmAfishaACF.contactInfo.map((item) => {
        return formatQueriesKeys(item, { person: 'name' });
      })
    : null;
  const location = event.zmAfishaACF.eventAddress.streetAddress
    .split(',')
    .slice(0, 1)
    .join();

  return (
    <div className="single__event">
      <Head>
        <title>{event.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="event container">
        <div className="event__wrapper row">
          <div className="event__background">
            <div className="event__content-wrapper col-xl-8">
              <div className="event__content col-xl-10">
                <div className="event__date">
                  <span className="event__day">24</span>
                  <span className="event__month">Березня</span>
                </div>
                <span className="event__time">
                  {event.zmAfishaACF.eventTime}
                </span>
                <h1 className="event__title">{event.title}</h1>
                <div
                  className="event__excerpt"
                  dangerouslySetInnerHTML={{ __html: event.excerpt }}
                />
                <div className="event__location">
                  <Icons icon="location" />
                  {location}
                </div>
              </div>
            </div>
          </div>
          <div className="event__content-wrapper col-xl-8">
            <div className="event__content col-xl-10">
              <Content content={event.blocks} className="event__main-content" />
            </div>
          </div>
          <div className="event__information col-xl-3">
            <StickyBox offsetTop={70} offsetBottom={20}>
              <div className="information__map">MAP</div>
              <div className="information__dates">
                {event.zmAfishaACF.eventAddress && (
                  <span>{`м. ${event.zmAfishaACF.eventAddress.city} ${event.zmAfishaACF.eventAddress.streetName} ${event.zmAfishaACF.eventAddress.streetNumber}`}</span>
                )}
                {event.zmAfishaACF.eventDate && (
                  <span>{event.zmAfishaACF.eventDate}</span>
                )}
                {event.zmAfishaACF.eventCost && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: event.zmAfishaACF.eventCost,
                    }}
                  />
                )}
              </div>
              <div className="information__about">
                {newContactData && <Contacts contactsData={newContactData} />}
                {newSocialData && (
                  <Socials socialsData={newSocialData} color={'black'} />
                )}
              </div>
            </StickyBox>
          </div>
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
