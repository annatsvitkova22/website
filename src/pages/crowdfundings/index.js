import React, { useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
//import dateFormat from 'dateformat';

import apolloClient from '~/lib/ApolloClient';
import '../../styles/pages/crowdfundings.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '~/components/ProgressBar/ProgressBar.scss';

import useFilterHook from '~/hooks/useCfFilterHook';
import CfsPost from '~/components/CfsPost';
import CfsFilter from '~/components/CfsFilter';
import EventsPost from '~/components/EventsPost';

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
  //console.log( JSON.stringify(props) );
  const { crowdfundings } = props;
  //const { data } = useCfFilterHook(crowdfundings.filter, crowdfundings.eventsData, crowdfundings.date);

  const [filter, setFilter] = useState(null);
  const [date, setDate] = useState(new Date().getDate());

  const cfFilter = (cf) => {
    const cfTarget = cf.currentTarget.name;

    setFilter(cfTarget);
    //setDate(new Date(cf.currentTarget.value));
  };


  var expDate = new Date();


  return (
    <div className="crowdfundings-page">
      <Head>
        <title>Crowdfundings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav className="cf-navigation">
          <ul className="cf-navigation__list">
            <CfsFilter cfFilter={cfFilter} />
          </ul>
        </nav>
        <section className="cf-crowdfundings row">

          <CfsPost eventsData={crowdfundings} filter={filter} date={date} />

          {crowdfundings.map((cfProps, i) => (
            <div class="col-4">
              <div className="cfitem">
                <div className="cfitem__thumb">
                  <img src={cfProps.featuredImage.guid} alt={cfProps.title + 'thumbnail'}/>
                  <div className="cfitem__thumb__status">Йде збір</div>
                </div>
                <div className="cfitem__container">
                  <div className="cfitem__title">
                    <a title={cfProps.title} href={cfProps.uri}>{cfProps.title}</a>
                  </div>
                  <div className="cfitem__descr">
                    <div dangerouslySetInnerHTML={{ __html: cfProps.excerpt }} />
                  </div>
                  <div className="cfitem__collected">
                    <div className="cfitem__collected__amount">
                      <NumberFormat value={10000} displayType={'text'} format="## ### ### ₴"/>
                      Зібрано з <NumberFormat value={cfProps.cfACF.crowdfundingRequiredAmountToCollect} displayType={'text'} format="## ### ### ₴"/>
                      <ProgressBar now={60}/>
                    </div>
                  </div>
                  <div className="cfitem__collected__left">
                    <img src="/assets/crowdfundings/clock.png"/>
                    {cfProps.cfACF.crowdfundingExpirationDate} днів залишилося
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

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
