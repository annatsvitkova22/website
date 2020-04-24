import React, { useEffect } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import { useStateLink } from '@hookstate/core';

import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import Article from '~/components/Article';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import SidebarNews from '~/components/Sidebar/News';
import ActionbarLoader from '~/components/Loaders/ActionbarLoader';
import { NewsStore, setCategories } from '~/stores/News';

const NEWS_ARCHIVE = gql`
  query NewsArchive($cursor: String, $articles: Int) {
    categories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
      }
    }
    posts(
      where: { orderby: { field: DATE, order: DESC } }
      first: $articles
      before: $cursor
    ) {
      nodes {
        id
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
        comments {
          pageInfo {
            total
          }
        }
        date
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

const News = ({ posts, categories }) => {
  const stateLink = useStateLink(NewsStore);
  const { sorting, filters } = stateLink.get();

  const currentSorting = sorting.find((i) => i.active);
  const currentCategory = filters.categories.find((i) => i.active);

  const { fetchingContent, state } = useLoadMoreHook(
    NEWS_ARCHIVE,
    posts,
    'news',
    10,
    2,
    'DATE',
    'ASC'
  );

  useEffect(() => {
    if (categories && !filters.categories.length) setCategories(categories);
  }, []);

  // const { currentSorting, defaultSorting } = sorting.reduce((acc, current) => {
  //   if (current.active) acc.currentSorting = current;
  //   if (current.default) acc.defaultSorting = current;
  //   return acc;
  // }, {});
  //
  // if (currentSorting.value !== defaultSorting.value) {
  //   router.replace({
  //     pathname: '/news',
  //     query: { sorting: currentSorting.value },
  //   });
  // }

  if (!state.data.nodes) {
    return (
      <div className="container">
        <div className="news-archive row">
          <main className="news-archive__content col-md-8">
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
          </main>
          <aside className="news-archive__sidebar col-md-4">
            <SidebarLoader />
            <SidebarLoader />
            <ActionbarLoader />
          </aside>
        </div>
      </div>
    );
  }
  const { nodes, pageInfo } = state.data;

  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="news-archive row">
          <main className="news-archive__content col-md-8">
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
          </main>
          <SidebarNews
            className="news-archive__sidebar col-md-4"
            sorting={sorting}
            filters={filters}
            currentCategory={currentCategory}
            currentSorting={currentSorting}
          />
        </div>
      </div>
    </div>
  );
};

News.propTypes = {
  posts: PropTypes.any,
};

News.getInitialProps = async () => {
  if (process.browser) {
    return {};
  }

  const { data } = await apolloClient.query({
    query: NEWS_ARCHIVE,
    variables: {
      articles: 10,
      cursor: null,
      orderby: 'DATE',
      order: 'ASC',
    },
  });
  const { posts, categories } = data;

  return { posts, categories };
};

export default News;
