import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import formatQueriesKeys from '../../util/formatQueriesKeys';

import apolloClient from '~/lib/ApolloClient';
import '../../styles/pages/events.scss';
import Socials from '~/components/Socials';
import Contacts from '~/components/Footer/Contacts';

const EVENT = gql`
  query Event($slug: String!) {
    eventBy(slug: $slug) {
      title
      content
      zmAfishaACF {
        eventDate
        eventCost
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

  return (
    <div className="single-event">
      <Head>
        <title>{event.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="row wrapper">
        <div className="event__content col-xs-6">
          <h1 className="title">{event.title}</h1>
          <div className="description">
            <div dangerouslySetInnerHTML={{ __html: event.content }} />
          </div>
        </div>
        <div className="event__information col-xs-6">
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
