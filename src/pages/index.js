import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import client from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import Content from '~/components/Content';
import addVideoDurations from '~/util/addVideoDurations';
import CrowdfundingsScene from '~/scenes/CrowdfundingsScene';
import VideosScene from '~/scenes/VideosScene';
import OpportunitiesScene from '~/scenes/OpportunitiesScene';
import EventsScene from '~/scenes/EventsScene';
import PublicationsScene from '~/scenes/PublicationsScene';
import PublicationCategoriesScene from '~/scenes/PublicationCategoriesScene';
import BlogsScene from '~/scenes/BlogsScene';
import TagsScene from '~/scenes/TagsScene';
import SectionHeading from '~/components/SectionHeading';

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

    users(
      first: 4
      where: {
        orderby: { field: REGISTERED, order: ASC }
        hasPublishedPosts: BLOG
      }
    ) {
      nodes {
        name
        slug
        description
        bloggerInfoACF {
          info
          avatar {
            mediaItemUrl
          }
          info
          socials {
            name
            url
          }
        }
        blogs(first: 3) {
          nodes {
            id
            title
            slug
            featuredImage {
              mediaItemUrl
            }
          }
        }
      }
    }

    crowdfundings(first: 9) {
      nodes {
        id
        excerpt
        content
        uri
        title
        slug
        date
        author {
          id
          name
          nicename
          nickname
          username
        }
        featuredImage {
          mediaItemUrl
        }
        cfACF {
          tocollect
          expiration
          collected
        }
      }
      pageInfo {
        endCursor
        total
      }
    }

    tags {
      nodes {
        id
        name
        slug
        zmTagsACF {
          showOnHome
        }
        publications(first: 5) {
          nodes {
            title
            featuredImage {
              mediaItemUrl
            }
            author {
              slug
              name
            }
            categories {
              nodes {
                slug
                name
              }
            }
          }
        }
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

    opportunities(first: 4) {
      nodes {
        featuredImage {
          sourceUrl(size: THUMBNAIL)
        }
        title
        slug
        id
        zmAfishaACF {
          eventAddress {
            streetAddress
            streetName
            latitude
            longitude
          }
          eventTime
          eventDays {
            day
          }
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
  const {
    page,
    users,
    crowdfundings,
    tags,
    videos,
    opportunities,
    events,
    publications,
    categories,
  } = props;

  return (
    <div className="home-page">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title d-none">{page.title}</h1>
        {/* <Content content={page.blocks} /> */}

        <SectionHeading title="Блоги" href="/blogs" />
        <BlogsScene {...{ users }} />

        <SectionHeading title="Збір коштів" href="/crowdfundings" />
        <CrowdfundingsScene {...{ crowdfundings }} />

        <SectionHeading title="!коронавирус" href="/videos" />
        <TagsScene {...{ tags }} />

        <SectionHeading title="Відео" href="/videos" />
        <VideosScene {...{ videos }} />

        <SectionHeading
          title="Можлівості"
          href="/opportunities"
          classMode="opport"
        />
        <OpportunitiesScene {...{ opportunities }} />

        <SectionHeading title="Афіша" href="/events" classMode="events" />
        <EventsScene {...{ events }} />

        <SectionHeading
          title="Публікації"
          href="/publications"
          classMode="publ"
        />
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

  const {
    pages,
    users,
    crowdfundings,
    tags,
    videos,
    opportunities,
    events,
    publications,
    categories,
  } = data;

  return {
    page: pages.nodes[0],
    users,
    crowdfundings,
    tags,
    // TODO: Put bellow function on frontend
    videos: await addVideoDurations(videos.nodes),
    opportunities,
    events,
    publications,
    categories,
  };
};

export default Home;
