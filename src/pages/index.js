import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import client from '../lib/ApolloClient';
import '../styles/pages/home.scss';
import Content from '../components/Content';

// TODO: restore, create custom GraphQL resolver
// homepage {
//   id
//   title
//   content
// }

const HOME_PAGE = gql`
  query PageQuery {
    pages(where: { title: "Головна" }) {
      nodes {
        title
        blocks {
          __typename
          ... on CoreHeadingBlock {
            name
            attributes {
              __typename
              ... on CoreHeadingBlockAttributes {
                content
                level
              }
            }
          }
          ... on CoreParagraphBlock {
            name
            attributes {
              __typename
              ... on CoreParagraphBlockAttributes {
                backgroundColor
                content
              }
              ... on CoreParagraphBlockAttributesV3 {
                fontSize
                content
              }
            }
          }
        }
      }
    }
  }
`;

const Home = (props) => {
  const { page } = props;
  return (
    <div className="home-page">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{page.title}</h1>

        <Content content={page.blocks} />
      </main>
    </div>
  );
};

Home.getInitialProps = async () => {
  const result = await client.query({
    query: HOME_PAGE,
  });

  return {
    page: result.data.pages.nodes[0],
  };
};

export default Home;
