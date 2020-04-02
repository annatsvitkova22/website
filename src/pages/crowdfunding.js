import React from 'react';
import gql from 'graphql-tag';

import client from '../lib/ApolloClient';

const CROWDFUNDING_PAGE = gql`
  query PageQuery {
    crowdfundings {
      edges {
        node {
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
  }
`;

const CfItem = (props) => {
  const cfProps = props.props;

  return (
    <section class="cfitem">
      <div class="cfitem__thumb">
        <img src={cfProps.featuredImage.guid} alt={cfProps.title + 'thumbnail'}/>
      </div>
      <div class="cfitem__title">
        <div className="cfitem__title"><a title={cfProps.title} href={cfProps.uri}>{cfProps.title}</a></div>
      </div>
      <div class="cfitem__descr">
        {cfProps.excerpt}`
      </div>
      <div className="cfitem__collected">
        <div className="cfitem__collected__amount">{cfProps.cfACF.crowdfundingRequiredAmountToCollect}</div>
        <div className="cfitem__collected__left">{cfProps.cfACF.crowdfundingExpirationDate}</div>
        <div className="cfitem__collected__percent">{{ __html: cfProps.cfACF.crowdfundingAboutProjectTabs }}</div>
      </div>
      <div className="cfitem__timeout"></div>
    </section>
  );
};

const Crowdfunding = (page) => {
  console.log('#begin debugging');
  console.log(JSON.stringify(page));
  console.log('#end debugging');

  const cfPage = page.page;
  const listItems = cfPage.map(item =>
    <CfItem props={item.node}/>,
  );

  return (
    <main>
      <section>
        {listItems}
      </section>
    </main>
  );
};

Crowdfunding.getInitialProps = async () => {
  const result = await client.query({
    query: CROWDFUNDING_PAGE,
  });

  return {
    page: result.data.crowdfundings.edges,
  };
};

export default Crowdfunding;
