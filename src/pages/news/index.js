import React, { useEffect, useState } from 'react';
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
import { NewsStore, CreateNewsStore } from '~/stores/News';
import useRouterSubscription from '~/hooks/useRouterSubscription';
import { dateToGraphQLQuery } from '~/util/date';

const NEWS_ARCHIVE = gql`
  query NewsArchive(
    $cursor: String
    $articles: Int
    $day: Int = null
    $month: Int = null
    $year: Int = null
    $category: String
  ) {
    categories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
      }
    }
    posts(
      where: {
        orderby: { field: DATE, order: DESC }
        dateQuery: { day: $day, month: $month, year: $year }
        taxQuery: {
          relation: OR
          taxArray: [
            {
              terms: [$category]
              taxonomy: CATEGORY
              operator: IN
              field: SLUG
            }
          ]
        }
      }
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

const News = ({ posts, categories, query }) => {
  const [loaded, setLoaded] = useState(false);
  const stateLink = useStateLink(
    loaded ? NewsStore : CreateNewsStore(loaded, { categories, ...query })
  );

  const { sorting, filters } = stateLink.get();

  const { currentSorting, defaultSorting } = sorting.reduce((acc, current) => {
    if (current.active) acc.currentSorting = current;
    if (current.default) acc.defaultSorting = current;
    return acc;
  }, {});
  const currentCategory = filters.categories.find((i) => i.active);

  const { fetchingContent, state } = useLoadMoreHook(
    NEWS_ARCHIVE,
    posts,
    'news',
    10,
    2
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  useRouterSubscription(
    {
      name: 'sorting',
      current: currentSorting.value,
      default: defaultSorting.value,
      initial: query.sorting,
    },
    {
      name: 'date',
      current: filters.date,
      initial: query.date,
    },
    {
      name: 'category',
      current: currentCategory ? currentCategory.value : undefined,
      initial: query.category,
    }
  );

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

News.getInitialProps = async ({ query }) => {
  if (process.browser) {
    return { query };
  }

  let variables = {
    articles: 10,
    cursor: null,
  };

  const { date, category } = query;

  if (date) {
    variables = {
      ...variables,
      ...dateToGraphQLQuery(date),
    };
  }

  if (category) {
    // console.log(composeTaxQuery('OR', {
    //   filed: 'SLUG',
    //   operator: 'IN',
    //   taxonomy: 'CATEGORY',
    //   terms: category
    // }));
    variables.category = category;
    console.log(variables);
  }

  const { data } = await apolloClient.query({
    query: NEWS_ARCHIVE,
    variables,
  });
  const { posts, categories } = data;

  console.log(categories);

  return { posts, categories, query };
};

export default News;
