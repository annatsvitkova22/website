import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import client from '~/lib/ApolloClient';
import addVideoDurations from '~/util/addVideoDurations';
import HeroScene from '~/scenes/HeroScene';
import CrowdfundingsScene from '~/scenes/CrowdfundingsScene';
import VideosScene from '~/scenes/VideosScene';
import OpportunitiesScene from '~/scenes/OpportunitiesScene';
import EventsScene from '~/scenes/EventsScene';
import PublicationsScene from '~/scenes/PublicationsScene';
import PublicationCategoriesScene from '~/scenes/PublicationCategoriesScene';
import BlogsScene from '~/scenes/BlogsScene';
import TagsScene from '~/scenes/TagsScene';
import SectionHeading from '~/components/SectionHeading';
import MainPublications from '~/components/MainPublications';
import HomeHeroLoader from '~/components/Loaders/Home/Hero';

// TODO: split to multiple requests
const HOME_PAGE = gql`
  query PageQuery {
    pages(where: { title: "Головна" }) {
      nodes {
        title
      }
    }

    posts(first: 40) {
      nodes {
        title
        slug
        date
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
        userAdditionalACF {
          avatar {
            mediaItemUrl
          }
        }
        bloggerInfoACF {
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
            slug
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
          eventDate
        }
      }
    }

    publications(first: 20) {
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
        id
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
  const [state, setState] = useState(props);
  const {
    page,
    posts,
    users,
    crowdfundings,
    tags,
    videos,
    opportunities,
    events,
    publications,
    categories,
  } = state;

  const loadMainData = async () => {
    // TODO: split to different loader for every section
    const { data } = await client.query({
      query: HOME_PAGE,
    });
    const newState = {
      page: data.pages.nodes[0],
      posts: data.posts,
      users: data.users,
      crowdfundings: data.crowdfundings,
      tags: data.tags,
      // TODO: Put bellow function on frontend
      videos: await addVideoDurations(data.videos.nodes),
      opportunities: data.opportunities,
      events: data.events,
      publications: data.publications,
      categories: data.categories,
    };
    setState(newState);
  };

  useEffect(() => {
    if (!page) {
      loadMainData();
    }
  }, []);

  if (!page) {
    return (
      <div className="home-page">
        <main className="container hero">
          <HomeHeroLoader />
        </main>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title d-none">{page.title}</h1>

        <HeroScene {...{ posts, publications }} />

        <SectionHeading title="Блоги" href="/blogs" />
        <BlogsScene {...{ users }} />

        <SectionHeading title="Збір коштів" href="/crowdfundings" />
        <CrowdfundingsScene {...{ crowdfundings }} />

        <MainPublications {...{ publications }} />

        <TagsScene {...{ tags }} />

        <SectionHeading title="Відео" href="/videos" classMode="videos" />
        <VideosScene {...{ videos }} />

        <SectionHeading
          title="Можлівості"
          href="/opportunities"
          classMode="opport"
        />
        <OpportunitiesScene {...{ opportunities }} />

        <SectionHeading title="Афіша" href="/events" classMode="events" />
        <EventsScene {...{ events }} form={true} />

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
  if (process.browser) {
    return {};
  }

  const { data } = await client.query({
    query: HOME_PAGE,
  });

  const {
    pages,
    posts,
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
    posts,
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
