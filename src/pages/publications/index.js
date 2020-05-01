import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import PublicationMainLoader from '~/components/Loaders/PublicationMainLoader';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import Article from '~/components/Article';
import NewsLoader from '~/components/Loaders/NewsLoader';
import MainPublication from '~/components/MainPublication';

const PUBLICATIONS_ARCHIVE = gql`
  query PublicationsArchive($cursor: String, $articles: Int) {
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
            }
          }
        }
      }
    }
    publications(first: $articles, before: $cursor) {
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

const variables = {
  articles: 11,
};

const Publications = (props) => {
  const { info, publications, categories } = props;
  const { fetchingContent, state } = useLoadMoreHook(
    PUBLICATIONS_ARCHIVE,
    publications,
    'publications',
    variables.articles
  );

  const filteredCategories = categories.nodes.filter(
    ({ zmCategoryACF: { showOnPublications } }) => showOnPublications === true
  );

  const sortedCategories = filteredCategories.sort(
    (categoryA, categoryB) =>
      categoryA.zmCategoryACF.order - categoryB.zmCategoryACF.order
  );

  if (!state.data.nodes) return <PublicationMainLoader />;
  const { nodes, pageInfo } = state.data;

  return (
    <div className="publ-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Публікації'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* MainPubl */}
        <MainPublication {...{ ...info.generalInfoACF.mainPublication }} />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h6 className="publ-page__title text-uppercase">Останні</h6>
            </div>
          </div>
          <div className="last-publs">
            <div className="row">
              {nodes.slice(0, 10).map((post) => (
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
        <div className="container publ-archive">
          <div className="row">
            <div className="col-12">
              <h6 className="publ-page__title text-uppercase">Архів</h6>
              <div className="publ-archive__content">
                {nodes.map((post, i) => (
                  <React.Fragment key={i}>
                    <ChronologicalSeparator posts={nodes} currentIndex={i} />
                    <Article type="news" post={post} key={post.id}>
                      {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                        <Waypoint onEnter={fetchingContent} />
                      )}
                    </Article>
                  </React.Fragment>
                ))}
                {state.isLoading && <NewsLoader />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Publications.propTypes = {
  publications: PropTypes.any,
};

Publications.getInitialProps = async () => {
  const { data } = await apolloClient.query({
    query: PUBLICATIONS_ARCHIVE,
    variables: {
      cursor: null,
    },
  });

  const { info, publications, categories } = data;

  return { info, publications, categories };
};

export default Publications;
