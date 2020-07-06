import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import PublicationMainLoader from '~/components/Loaders/PublicationMainLoader';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import Article from '~/components/Article';
import NewsLoader from '~/components/Loaders/NewsLoader';
import MainPublication from '~/components/MainPublication';
import PublicationCategoriesScene from '~/scenes/PublicationCategoriesScene';

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
        date
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
          additionalImage {
            zm_md: sourceUrl(size: ZM_MD)
            mediaItemUrl
          }
        }
      }
      pageInfo {
        endCursor
        total
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
            }
          }
        }
      }
    }
  }
`;

const variables = {
  articles: 12,
};

const Publications = (props) => {
  const [data, setData] = useState(props);
  const { info, publications } = data;
  const [categories, setCategories] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const { fetchingContent, state } = useLoadMoreHook(
    PUBLICATIONS_ARCHIVE,
    publications,
    'publications',
    variables.articles
  );

  function loadData(query) {
    return async () => {
      setLoading(true);
      const response = await apolloClient.query({ query });

      setCategories((prevState) => ({
        ...prevState,
        ...response.data.categories,
      }));
      setLoading(false);
    };
  }

  useEffect(() => {
    const loadContent = async () => {
      const content = await apolloClient.query({
        query: PUBLICATIONS_ARCHIVE,
        variables: {
          cursor: null,
          articles: 11,
        },
      });

      setData(content.data);
    };
    if (!info && !publications) {
      loadContent();
    }
  }, []);

  if (!info && !publications) {
    return (
      <div className="publ-page">
        <main>
          <PublicationMainLoader />
        </main>
      </div>
    );
  }

  const { nodes, pageInfo } = state.data;

  return (
    <div className="publ-page">
      <Head>
        <title>ЗМІСТ - Публікації</title>
      </Head>
      <main>
        <MainPublication {...{ ...info.generalInfoACF.mainPublication }} />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h6 className="publ-page__title text-uppercase">Останні</h6>
            </div>
          </div>
          {nodes && (
            <div className="last-publs">
              <div className="row">
                {nodes.slice(0, 11).map((post, i) => (
                  <Article type="publications" post={post} key={i} />
                ))}
              </div>
            </div>
          )}
        </div>

        <PublicationCategoriesScene {...{ categories, isLoading }}>
          {typeof categories === 'undefined' && (
            <Waypoint onEnter={loadData(CATEGORIES)} />
          )}
        </PublicationCategoriesScene>

        {nodes && (
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
        )}
      </main>
    </div>
  );
};

Publications.propTypes = {
  publications: PropTypes.any,
};

Publications.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }

  const { data } = await apolloClient.query({
    query: PUBLICATIONS_ARCHIVE,
    variables: {
      cursor: null,
      articles: 11,
    },
  });

  const { info, publications, categories } = data;

  return { info, publications, categories };
};

export default Publications;
