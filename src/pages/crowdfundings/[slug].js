import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import ProgressBar from 'react-bootstrap/ProgressBar';

import '../../styles/pages/crowdfundings.scss';
import apolloClient from '~/lib/ApolloClient';

const CROWDFUNDING = gql`
  query Crowdfunding($slug: String!) {
    crowdfundingBy(slug: $slug) {
      id
      excerpt
      content
      uri
      title
      slug
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
`;

const Crowdfunding = (props) => {
  const { crowdfunding } = props;

  return (
    <div className="crowdfunding-single-page">
      <Head>
        <title>{crowdfunding.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="cf-crowdfunding">
          <section className="cf-content">
            <div className="cfsingle__title">{crowdfunding.title}</div>
            <div className="cfsingle__thumb">
              <img
                src={crowdfunding.featuredImage.guid}
                alt={`${crowdfunding.title}thumbnail`}
              />
            </div>
            <div className="cfsigle__descr">
              <div dangerouslySetInnerHTML={{ __html: crowdfunding.content }} />
              {/* <Content blocks={crowdfunding.content} /> */}
            </div>
            <div className="cfitem__timeout" />
          </section>
          <section className="cf-sidebar">
            <div className="cfsingle__collected">
              <div className="cfsingle__collected__amount">
                <NumberFormat
                  value={10000}
                  displayType={'text'}
                  format="## ### ### ₴"
                />
                Зібрано з{' '}
                <NumberFormat
                  value={crowdfunding.cfACF.crowdfundingRequiredAmountToCollect}
                  displayType={'text'}
                  format="## ### ### ₴"
                />
                <ProgressBar now={60} />
              </div>
            </div>
            <div className="cf-sidebar__info">
              <div>
                14
                <br />
                Підтримали
              </div>
              <div>
                {crowdfunding.cfACF.crowdfundingExpirationDate}
                <br />
                Запушено
              </div>
              <div>
                25 днів
                <br />
                Залишилося
              </div>
            </div>
            <a href="#" title="Підтримати проєкт" className="cf-sidebar__btn">
              Підтримати проєкт
            </a>
            <a href="#" title="Підтримати проєкт" className="cf-sidebar__btn">
              Поділитися
            </a>
          </section>
        </section>
      </main>
    </div>
  );
};

Crowdfunding.propTypes = {
  crowdfunding: PropTypes.object,
};

Crowdfunding.getInitialProps = async ({ query: { slug } }) => {
  const { data } = await apolloClient.query({
    query: CROWDFUNDING,
    variables: { slug },
  });

  return {
    crowdfunding: data.crowdfundingBy,
  };
};

export default Crowdfunding;
