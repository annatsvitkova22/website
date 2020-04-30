import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Link from 'next/link';

import client from '~/lib/ApolloClient';
import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';
import Content from '~/components/Content';
import PhotoSwipeGallery from '~/components/PhotoSwipeGallery';
import {
  getThumbnailVideo,
  prepareGalleryItems,
  options,
} from '~/components/PhotoSwipeGallery/videoGalleryUtils';
import addVideoDurations from '~/util/addVideoDurations';
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
  const { page, videos, publications, categories } = props;

  const filteredCategories = categories.nodes.filter(
    ({ zmCategoryACF: { showOnPublications } }) => showOnPublications === true
  );

  const sortedCategories = filteredCategories.sort(
    (categoryA, categoryB) =>
      categoryA.zmCategoryACF.order - categoryB.zmCategoryACF.order
  );

  return (
    <div className="home-page">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{page.title}</h1>
        <Content content={page.blocks} />

        <div className="container">
          <div className="row line-height-1 video-category__top-row">
            <div className="col-6">
              <h6 className="video-category__title text-uppercase tx-family-alt">
                Відео
              </h6>
            </div>
            <div className="col-6 text-right tx-green">
              <Link href={`/videos`}>
                <a className="video-category__watch-all tx-family-titles font-weight-semibold">
                  Дивись Усі
                </a>
              </Link>
            </div>
          </div>
          <div className="row">
            <PhotoSwipeGallery
              className="col-12 video-cat-gall"
              items={prepareGalleryItems(videos)}
              options={options()}
              thumbnailContent={getThumbnailVideo}
              playClass="tx-white"
            />
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h6 className="publ-page__title text-uppercase">публікації</h6>
            </div>
          </div>
          <div className="last-publs">
            <div className="row">
              {publications.nodes.map((post) => (
                <Article type="publications" post={post} key={post.id} />
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {sortedCategories
              .slice(0, 4)
              .map(
                ({
                  publications: { nodes },
                  name,
                  slug,
                  zmCategoryACF: { order, size },
                }) => {
                  let colSize = '';
                  switch (size) {
                    case 'medium':
                      colSize = 'col-xl-3';
                      break;
                    case 'big':
                      colSize = 'col-xl-4';
                      break;
                    case 'small':
                      colSize = 'col-xl-2';
                      break;

                    default:
                      break;
                  }

                  return (
                    <div className={`publ-cat__col--${size} ${colSize}`}>
                      <h6 className="publ-page__title text-uppercase">
                        <Link href={`/search?category=${slug}`}>
                          <a>{name}</a>
                        </Link>
                      </h6>
                      <div className="publ-cats__container">
                        {size === 'big' && nodes.length && (
                          <>
                            <div className="row main-cat__row main-cat__row--primary">
                              {nodes.slice(0, 1).map((post, i) => (
                                <Article
                                  isFirst={true}
                                  size={size}
                                  type="publications-cats"
                                  post={post}
                                  key={post.id}
                                />
                              ))}
                            </div>
                            <div className="row main-cat__row main-cat__row--sub">
                              {nodes.slice(1, nodes.length).map((post, i) => (
                                <Article
                                  isFirst={false}
                                  index={i}
                                  size={size}
                                  type="publications-cats"
                                  post={post}
                                  key={post.id}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        {!(size === 'big') && nodes.length !== 1 && (
                          <div className="row">
                            {nodes.map((post, i) => (
                              <Article
                                index={i}
                                size={size}
                                type="publications-cats"
                                post={post}
                                key={post.id}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
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

  const { pages, videos, publications, categories } = data;

  return {
    page: pages.nodes[0],
    // TODO: Put bellow function on frontend
    videos: await addVideoDurations(videos.nodes),
    publications,
    categories,
  };
};

export default Home;
