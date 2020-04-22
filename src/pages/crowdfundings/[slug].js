import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';
import Content from '~/components/Content';
import '../../styles/pages/crowdfundings.scss';
import NumberFormat from "react-number-format";
import ProgressBar from 'react-bootstrap/ProgressBar';

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
        <section className="cf-crowdfunding row">
          <section className="cf-content col-9">
            <div className="cfsingle__title">
              {crowdfunding.title}
            </div>
            <div className="cfsingle__thumb">
              <img src={crowdfunding.featuredImage.guid} alt={crowdfunding.title + 'thumbnail'}/>
            </div>
            <div className="cfsigle__descr">
              <div dangerouslySetInnerHTML={{ __html: crowdfunding.content }} />
              { /* <Content blocks={crowdfunding.content} /> */ }
            </div>
            <div className="cfitem__timeout"></div>
          </section>
          <section className="cf-sidebar col-3">
            <div className="cfsingle__collected">
              <span className="cfsingle__collected__target">Ціль <NumberFormat value={crowdfunding.cfACF.crowdfundingRequiredAmountToCollect} displayType={'text'} format="## ### ### ₴"/></span>
              <div className="cfsingle__collected__amount">
                <NumberFormat value={10000} displayType={'text'} format="## ### ### грн"/> <span className="cfsingle__collected__amount__word"> зібрано</span>
                <ProgressBar now={60} />
              </div>
              <div className="cf-sidebar__info__supported">Підтримали<span>145</span></div>
              <div className="cf-sidebar__info__spread">Підтримали<span>123</span></div>
              <div className="cf-sidebar__info__spread"><span>{crowdfunding.cfACF.crowdfundingExpirationDate} днів</span> Залишилося</div>
            </div>
            <a href="#" title="Підтримати проєкт" className="cf-sidebar__btn">Підтримати проєкт</a>
            <a href="#" title="Підтримати проєкт" className="cf-sidebar__btn">Поділитися</a>
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
