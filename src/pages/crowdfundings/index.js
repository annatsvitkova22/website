import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import apolloClient from '~/lib/ApolloClient';

import '../../styles/pages/crowdfundings.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '~/styles/components/progressBar.scss';

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
  const { crowdfundings } = props;
  return (
    <div className="crowdfundings-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
                  <div className="cfitem__title">
                    <a title={cfProps.title} href={cfProps.uri}>
                      {cfProps.title}
                    </a>
                  </div>
                </div>
                <div className="cfitem__descr">{cfProps.excerpt}</div>
                <div className="cfitem__collected">
                  <div className="cfitem__collected__amount">
                    <NumberFormat
                      value={cfProps.cfACF.crowdfundingRequiredAmountToCollect}
                      displayType={'text'}
                      format="## ### ### ₴"
                    />
                    Зібрано з{' '}
                    <NumberFormat
                      value={20000}
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
