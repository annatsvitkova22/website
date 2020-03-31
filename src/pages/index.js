import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';

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
            attributes {
              __typename
              ... on CoreHeadingBlockAttributes {
                align
                anchor
                className
                content
                customTextColor
                level
                placeholder
                textColor
              }
            }
          }
          ... on CoreParagraphBlock {
            attributes {
              __typename
              ... on CoreParagraphBlockAttributesV3 {
                fontSize
                content
                align
                backgroundColor
                className
                customBackgroundColor
                customFontSize
                customTextColor
                direction
                dropCap
                placeholder
                textColor
                width
              }
            }
          }
          ... on CoreImageBlock {
            attributes {
              align
              alt
              className
              caption
              height
              href
              id
              linkClass
              linkDestination
              linkTarget
              rel
              url
              sizeSlug
            }
          }
          ... on CoreEmbedYoutubeBlock {
            attributes {
              align
              allowResponsive
              caption
              className
              providerNameSlug
              url
              type
            }
          }
          ... on CoreEmbedSoundcloudBlock {
            attributes {
              align
              allowResponsive
              caption
              className
              providerNameSlug
              type
              url
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

Home.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
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
