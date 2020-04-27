import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import apolloClient from '~/lib/ApolloClient';
import BlogsLoader from '~/components/Loaders/BlogsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import PublicationMainLoader from '~/components/Loaders/PublicationMainLoader';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import Article from '~/components/Article';
import ArticleAuthor from '~/components/Article/Author';

const PUBLICATIONS_ARCHIVE = gql`
  query PublicationsArchive($cursor: String, $articles: Int) {
    info {
      generalInfoACF {
        mainPublication {
          ... on Publication {
            title
            uri
            author {
              firstName
              lastName
            }
            categories {
              nodes {
                name
                uri
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
        link
        zmCategoryACF {
          order
          showOnPublications
          size
        }
        publications {
          nodes {
            uri
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

const Publications = (props) => {
  const { info, publications, categories } = props;
  const { fetchingContent, state } = useLoadMoreHook(
    PUBLICATIONS_ARCHIVE,
    publications,
    'publications'
  );

  const filteredCategories = categories.nodes.filter(
    ({ zmCategoryACF: { showOnPublications } }) => showOnPublications === true
  );

  const {
    title,
    uri,
    featuredImage,
    author,
    categories: mainCats,
  } = info.generalInfoACF.mainPublication;

  if (!state.data.nodes) return <PublicationMainLoader />;
  const { nodes, pageInfo } = state.data;

  return (
    <div className="publ-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="publ-main">
        <div className="main-publ">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="main-publ__image pos-relative bg-cover"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(66, 65, 65, 0) 0%, #2B2B2B 100%), url(${featuredImage.mediaItemUrl})`,
                  }}
                >
                  <div className="main-publ__caption tx-white">
                    <ul className="cat-list list-reset text-center">
                      {mainCats.nodes.map(({ name, uri }, i) => (
                        <li key={i} className="cat-list__item">
                          <Link
                            href="/publications/category/[slug]"
                            as={` /publications/${uri}`}
                          >
                            <a className="cat-list__button">{name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <h1 className="text-center text-capitalize">{title}</h1>
                    <p className="text-center">
                      {author.firstName} {author.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {nodes.map((post) => (
              <Article type="publications" post={post} key={post.id}>
                {/* {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                  <Waypoint onEnter={fetchingContent} />
                )} */}
              </Article>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="row">
            {filteredCategories.map(
              ({ publications: { nodes }, name, link }) => (
                <div className="col-3">
                  <p>{name}</p>
                  {nodes.map(
                    ({
                      title,
                      uri,
                      author,
                      featuredImage: { mediaItemUrl },
                    }) => (
                      <div>
                        <feature>
                          <img src={mediaItemUrl} alt={title} />
                        </feature>
                        <h3>{title}</h3>
                        <div className="article__meta">
                          <ArticleAuthor
                            className="article__author"
                            author={author}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </div>
        </div>
        <div className="container publ-archive">
          <div className="row">
            <div className="col-12">
              <div className="news-archive__content ">
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
      first: 10,
      cursor: null,
    },
  });

  const { info, publications, categories } = data;

  return { info, publications, categories };
};

export default Publications;
