import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import apolloClient from '~/lib/ApolloClient';

import '../../styles/pages/crowdfundings.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '~/components/ProgressBar/ProgressBar.scss';

import useFilterHook from '~/hooks/useCfFilterHook';

const CROWDFUNDINGS_ARCHIVE = gql`
  query CrowdfundingsArchive {
    crowdfundings {
      nodes {
        id
        excerpt
        content
        uri
        title
        featuredImage {
          guid
        }
        cfACF {
          crowdfundingRequiredAmountToCollect
          crowdfundingExpirationDate
          crowdfundingAboutProjectTabs
        }
      }
    }
  }
`;

const CrowdfundingsArchive = (props) => {
  console.log(JSON.stringify(props));
  const { crowdfundings } = props;
  // const { data } = useCfFilterHook(crowdfundings.filter, crowdfundings.eventsData, crowdfundings.date);
  return (
    <div className="crowdfundings-page">
      <Head>
        <title>Crowdfundings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav className="cf-navigation">
          <ul className="cf-navigation__list">
            <li className="justify-content-around">
              <a href="#">Йде збір</a>
            </li>
            <li className="justify-content-around">
              <a href="#">Кошти зібрано</a>
            </li>
            <li className="justify-content-around">
              <a href="#">Реалізовано</a>
            </li>
          </ul>
        </nav>
        <section className="cf-crowdfundings">
          {crowdfundings.map((cfProps, i) => (
            <div className="cfitem">
              <div className="cfitem__thumb">
                <img
                  src={cfProps.featuredImage.guid}
                  alt={`${cfProps.title}thumbnail`}
                />
                <div className="cfitem__thumb__status">Йде збір</div>
              </div>
              <div className="cfitem__container">
                <div className="cfitem__title">
                  <a title={cfProps.title} href={cfProps.uri}>
                    {cfProps.title}
                  </a>
                </div>
                <div className="cfitem__descr">
                  <div dangerouslySetInnerHTML={{ __html: cfProps.excerpt }} />
                </div>
                <div className="cfitem__collected">
                  <div className="cfitem__collected__amount">
                    <NumberFormat
                      value={10000}
                      displayType={'text'}
                      format="## ### ### ₴"
                    />
                    Зібрано з{' '}
                    <NumberFormat
                      value={cfProps.cfACF.crowdfundingRequiredAmountToCollect}
                      displayType={'text'}
                      format="## ### ### ₴"
                    />
                    <ProgressBar now={60} />
                  </div>
                </div>
                <div className="cfitem__collected__left">
                  <img src="/assets/crowdfundings/clock.png" />
                  20 днів залишилося
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

// render filtered {
/*

const EventsPost = (props) => {
  const { filter, eventsData, date } = props;

  const { data } = useFilterHook(filter, eventsData, date);

  return (
    <div>
      {data &&
      data.map((item, index) => {
        return <EventPostItem key={index} item={item} />;
      })}
    </div>
  );
};

EventsPost.propTypes = {
  filter: PropTypes.string,
  eventsData: PropTypes.object,
  date: PropTypes.any,
};
*/
// export default EventsPost;
// } render filtered

CrowdfundingsArchive.propTypes = {
  crowdfundings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

CrowdfundingsArchive.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: CROWDFUNDINGS_ARCHIVE,
  });

  return {
    crowdfundings: data.crowdfundings.nodes,
  };
};

export default CrowdfundingsArchive;
