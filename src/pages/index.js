import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import client from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import Content from '~/components/Content';
import addVideoDurations from '~/util/addVideoDurations';
import VideosScene from '~/scenes/VideosScene';
import PublicationsScene from '~/scenes/PublicationsScene';
import PublicationCategoriesScene from '~/scenes/PublicationCategoriesScene';
import EventsScene from '~/scenes/EventsScene';
import Article from '~/components/Article';

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
        ${gutenbergBlocksQuery}
      }
    }
    videos(first: 8) {
      nodes {
        title
        excerpt
        date
        zmVideoACF {
          videoCover {
            mediaItemUrl
          }
          videoUrl
        }
      }
    }
    events(first: 7) {
      nodes {
        featuredImage {
          mediaItemUrl
        }
        title
        slug
        id
        zmAfishaACF {
          eventAddress {
            city
            streetName
            streetNumber
          }
          eventTime
        }
      }
    }
    publications(first: 6) {
      nodes {
        excerpt
        title
        slug
        featuredImage {
          mediaItemUrl
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        author {
          name
          nicename
          nickname
          slug
          userId
          username
        }
        zmPublicationsACF {
          size
          style
        }
      }
      pageInfo {
        endCursor
        total
      }
    }
    categories {
      nodes {
        name
        slug
        zmCategoryACF {
          order
          showOnPublications
          size
        }
        publications {
          nodes {
            slug
            title
            author {
              slug
              name
            }
            featuredImage {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

const Home = (props) => {
  const { page, videos, publications, categories, events } = props;

  return (
    <div className="home-page">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{page.title}</h1>
        <Content content={page.blocks} />

        <VideosScene {...{ videos }} />

        <EventsScene {...{ events }} />

        <PublicationsScene {...{ publications }} />

        <PublicationCategoriesScene {...{ categories }} />
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
  const { data } = await client.query({
    query: HOME_PAGE,
  });
  console.log(data);

  const { pages, videos, publications, categories, events } = data;

  return {
    page: pages.nodes[0],
    // TODO: Put bellow function on frontend
    videos: await addVideoDurations(videos.nodes),
    publications,
    categories,
    events,
  };
};

export default Home;
