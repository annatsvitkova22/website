import React, { useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import dateFormat from 'dateformat';
import Moment from 'react-moment';
import apolloClient from '~/lib/ApolloClient';
import '../../styles/pages/crowdfundings.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '~/components/ProgressBar/ProgressBar.scss';
import useFilterHook from '~/hooks/useCfFilterHook';
import CfsPost from '~/components/CfsPost';
import CfsFilter from '~/components/CfsFilter';
import EventsPost from '~/components/EventsPost';
import CfsLoader from '~/components/Loaders/CfsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import { Waypoint } from 'react-waypoint';

const CROWDFUNDINGS_ARCHIVE = gql`
  query CrowdfundingsArchive ($cursor: String) {
    crowdfundings(first: 3, before: $cursor) {
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
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const CrowdfundingsArchive = (props) => {
  const { fetchingContent, state } = useLoadMoreHook(
    CROWDFUNDINGS_ARCHIVE,
    props,
    'crowdfundings',
  );

  if (!state.data.nodes) {
    return (
      <div>
        <CfsLoader/>
      </div>
    );
  }

  const { nodes, pageInfo } = state.data;

  const { crowdfundings } = props;
  //const { data } = useCfFilterHook(crowdfundings.filter, crowdfundings.eventsData, crowdfundings.date);

  const [filter, setFilter] = useState(null);
  const [date, setDate] = useState(new Date().getDate());

  const cfFilter = (cf) => {
    const cfTarget = cf.currentTarget.name;

    setFilter(cfTarget);
    //setDate(new Date(cf.currentTarget.value));
  };

  function MyExpDate(props) {
    //var expDate = new Date(props.expDate);
    //var expDate = new Date(props.expDate).toDateString();
    //var mydate = moment('15/11/2000', 'DD/MM/YYYY');
    var msec = Date.parse(props.expDate);
    var expDate = new Date(msec);
    return (
      <>{expDate.getDate()}</>
    );
  }

  //console.log(JSON.stringify(crowdfundings));
  return (
    <div className="crowdfundings-page">
      <Head>
        <title>Crowdfundings</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <nav className="cf-navigation">
          <ul className="cf-navigation__list">
            <CfsFilter cfFilter={cfFilter}/>
          </ul>
        </nav>
        <section className="cf-crowdfundings row">
          {/* DISABLE <CfsPost cfsData={nodes} filter={filter} date={date} /> */}
          <React.Fragment>
            {nodes.map((item, i) => (
              <>
                <div className="col-4">
                  <div className="cfitem">
                    <div className="cfitem__thumb">
                      <img src={item.featuredImage.guid} alt={item.title + 'thumbnail'}/>
                      <div className="cfitem__thumb__status">Йде збір</div>
                    </div>
                    <div className="cfitem__container">
                      <div className="cfitem__title">
                        <a title={item.title} href={item.uri}>{item.title}</a>
                      </div>
                      <div className="cfitem__descr">
                        <div dangerouslySetInnerHTML={{ __html: item.excerpt }}/>
                      </div>
                      <div className="cfitem__collected">
                        <div className="cfitem__collected__amount">
                          <NumberFormat value={10000} displayType={'text'} format="## ### ### ₴"/>
                          Зібрано з <NumberFormat value={item.cfACF.crowdfundingRequiredAmountToCollect}
                                                  displayType={'text'}
                                                  format="## ### ### ₴"/>
                          <ProgressBar now={60}/>
                        </div>
                      </div>
                      <div className="cfitem__collected__left">
                        <img src="/assets/crowdfundings/clock.png"/>
                        <Moment parse="DD/MM/YYYY HH:mm:ss"
                                format="DD/MM/YYYY">{item.cfACF.crowdfundingExpirationDate}</Moment> завершення
                      </div>
                    </div>
                  </div>
                </div>
                {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                  <Waypoint onEnter={fetchingContent}/>
                )}
              </>
            ))}
            {state.isLoading && <CfsLoader/>}
          </React.Fragment>
        </section>
      </main>
    </div>
  );
};

CrowdfundingsArchive.propTypes = {
  crowdfundings: PropTypes.any,
};

CrowdfundingsArchive.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }
  const { data } = await apolloClient.query({
    query: CROWDFUNDINGS_ARCHIVE,
    variables: {
      cursor: null,
    },
  });
  const { crowdfundings } = data;
  return crowdfundings;
};

export default CrowdfundingsArchive;
