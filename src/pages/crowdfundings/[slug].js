import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import apolloClient from '~/lib/ApolloClient';
import Content from '~/components/Content';
import '../../styles/pages/crowdfundings.scss';

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
    <div className="single-crowdfundings">
      <Head>
        <title>{crowdfunding.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="cfitem__title">
          <div className="cfitem__title">{crowdfunding.title}</div>
        </div>
        <section className="cf-crowdfunding">
          <section className="cf-content">
            <div className="cfitem__thumb">
              <img
                src={crowdfunding.featuredImage.guid}
                alt={`${crowdfunding.title}thumbnail`}
              />
            </div>
            <div className="cfitem__descr">
              {<Content blocks={crowdfunding.content} />}
            </div>
            <div className="cfitem__collected">
              <div className="cfitem__collected__amount">
                {crowdfunding.cfACF.crowdfundingRequiredAmountToCollect}
              </div>
              <div className="cfitem__collected__left">
                {crowdfunding.cfACF.crowdfundingExpirationDate}
              </div>
              <div className="cfitem__collected__percent">
                {crowdfunding.cfACF.crowdfundingAboutProjectTabs}
              </div>
            </div>
            <div className="cfitem__timeout" />
          </section>
          <section className="cf-sidebar">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
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
