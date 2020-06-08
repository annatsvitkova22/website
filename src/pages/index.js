import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import getConfig from 'next/config';

import client from '~/lib/ApolloClient';
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

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

// TODO: split to multiple requests
const HOME_PAGE = gql`
  query PageQuery {
    info {
      generalInfoACF {
        mainPublication {
          ... on Publication {
            title
            uri
            slug
            author {
              name
              nicename
              nickname
              slug
              userId
              username
            }
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              mediaItemUrl
              frontHeroImage: sourceUrl(size: FRONT_HERO_IMAGE)
            }
          }
        }
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
      where: {
        orderby: { field: REGISTERED, order: ASC }
        hasPublishedPosts: BLOG
      }
      first: 4
    ) {
      nodes {
        name
        slug
        description
        userAdditionalACF {
          avatar {
            mediaItemUrl
            zm_xs: sourceUrl(size: ZM_XS)
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

    publications(first: 8) {
      nodes {
        id
        excerpt
        title
        slug
        featuredImage {
          mediaItemUrl
          zm_xss: sourceUrl(size: ZM_XSS)
          zm_md_rect: sourceUrl(size: ZM_MD_RECT)
          zm_lg_rect_2: sourceUrl(size: ZM_LG_RECT_2)
          zm_lg_rect: sourceUrl(size: ZM_LG_RECT)
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
    }
  }
`;

const CROWDFUNDINGS = gql`
  query Crowdfundings {
    crowdfundings(first: 3) {
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
          zm_md_rect: sourceUrl(size: ZM_MD_RECT)
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
  }
`;

const TAGS = gql`
  query Tags {
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
              zm_md_rect: sourceUrl(size: ZM_MD_RECT)
              zm_lg_rect_2: sourceUrl(size: ZM_LG_RECT_2)
              zm_lg_rect: sourceUrl(size: ZM_LG_RECT)
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
  }
`;

const VIDEOS = gql`
  query Videos {
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
  }
`;

const OPPORTUNITIES = gql`
  query Opportunities {
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
  }
`;

const EVENTS = gql`
  query Events {
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
  }
`;

const CATEGORIES = gql`
  query Categories {
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
        publications(first: 10) {
          nodes {
            slug
            title
            author {
              slug
              name
            }
            featuredImage {
              mediaItemUrl
              zm_md_rect: sourceUrl(size: ZM_MD_RECT)
              zm_lg_rect_2: sourceUrl(size: ZM_LG_RECT_2)
              zm_lg_rect: sourceUrl(size: ZM_LG_RECT)
            }
          }
        }
      }
    }
  }
`;

const Home = (props) => {
  const [state, setState] = useState(props);
  const [isLoading, setLoading] = useState(false);

  const {
    info,
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
      info: data.info,
      posts: data.posts,
      users: data.users,
      crowdfundings: data.crowdfundings,
      tags: data.tags,
      videos: data.videos,
      opportunities: data.opportunities,
      events: data.events,
      publications: data.publications,
      categories: data.categories,
    };

    setState(newState);
  };

  function loadData(query) {
    return async () => {
      setLoading(true);
      const { data } = await client.query({ query });

      setState((prevState) => ({
        ...prevState,
        ...data,
      }));
      setLoading(false);
    };
  }

  useEffect(() => {
    if (!posts) {
      loadMainData();
    }
  }, []);

  if (!posts) {
    return <HomeHeroLoader />;
  }

  return (
    <div className="home-page">
      <Head>
        <title>ЗМІСТ - Головна</title>

        <meta name="title" content="ЗМІСТ - Зміни створюєш ти!" />
        <meta
          name="description"
          content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${config.frontUrl}`} />
        <meta property="og:title" content="ЗМІСТ - Зміни створюєш ти!" />
        <meta
          property="og:description"
          content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
        />
        <meta property="og:image" content="/zmist.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${config.frontUrl}`} />
        <meta property="twitter:title" content="ЗМІСТ - Зміни ствоюєш ти!" />
        <meta
          property="twitter:description"
          content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
        />
        <meta property="twitter:image" content="/zmist.jpg" />
      </Head>

      <main>
        <h1 style={{ fontSize: 0, margin: 0 }}>ЗМІСТ - Зміни створюєш ти!</h1>
        <HeroScene {...{ info, posts, publications }} />

        <SectionHeading title="Блоги" href="/blogs" />
        <BlogsScene {...{ users }} />
        <SectionHeading title="Збір коштів" href="/crowdfundings" />
        <CrowdfundingsScene {...{ crowdfundings, isLoading }}>
          {typeof crowdfundings === 'undefined' && (
            <Waypoint onEnter={loadData(CROWDFUNDINGS)} />
          )}
        </CrowdfundingsScene>

        <TagsScene {...{ tags, isLoading }}>
          {typeof tags === 'undefined' && <Waypoint onEnter={loadData(TAGS)} />}
        </TagsScene>

        <SectionHeading title="Відео" href="/videos" classMode="videos" />
        <VideosScene {...{ videos, isLoading }}>
          {typeof videos === 'undefined' && (
            <Waypoint onEnter={loadData(VIDEOS)} />
          )}
        </VideosScene>

        <SectionHeading
          title="Можливості"
          href="/opportunities"
          classMode="opport"
        />
        <OpportunitiesScene {...{ opportunities, isLoading }}>
          {typeof opportunities === 'undefined' && (
            <Waypoint onEnter={loadData(OPPORTUNITIES)} />
          )}
        </OpportunitiesScene>

        <SectionHeading title="Афіша" href="/events" classMode="events" />
        <EventsScene {...{ events, isLoading }} hasForm={true}>
          {typeof events === 'undefined' && (
            <Waypoint onEnter={loadData(EVENTS)} />
          )}
        </EventsScene>

        <SectionHeading
          title="Публікації"
          href="/publications"
          classMode="publ"
        />
        <PublicationsScene {...{ publications }} />

        <PublicationCategoriesScene {...{ categories, isLoading }}>
          {typeof categories === 'undefined' && (
            <Waypoint onEnter={loadData(CATEGORIES)} />
          )}
        </PublicationCategoriesScene>
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

  const { info, posts, users, publications } = data;

  return {
    info,
    posts,
    users,
    publications,
  };
};

export default Home;
