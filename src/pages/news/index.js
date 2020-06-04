import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import { useStateLink } from '@hookstate/core';
import { Router } from 'next/router';
import StickyBox from 'react-sticky-box';

import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import Article from '~/components/Article';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import SidebarNews from '~/components/Sidebar/News';
import {
  NewsStore,
  CreateNewsStore,
  setIsChanged,
  setCategory,
  setDate,
  setSorting,
} from '~/stores/News';
import useRouterSubscription from '~/hooks/useRouterSubscription';
import dateToGraphQLQuery from '~/util/date';
import ChevronDown from '~/static/images/chevron-down';
import Icons from '~/components/Icons';
import Calendar from '~/components/Calendar';
import SortingSelect from '~/components/SortingSelect';
import LineLoader from '~/components/Loaders/LineLoader';

const composeQuery = ({
  cursor,
  articles,
  day,
  month,
  year,
  category,
  sorting,
}) => {
  return gql`
    query NewsArchive(
      $cursor: String = ${cursor}
      $articles: Int = ${articles}
      $day: Int = ${day || null}
      $month: Int = ${month || null}
      $year: Int = ${year || null}
      ${category ? `$category: [String] = ["${category.join('","')}"]` : ``}
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
          ${
            sorting
              ? `orderby: { field: ${sorting.field}, order: ${sorting.order} }`
              : ``
          }
          dateQuery: { day: $day, month: $month, year: $year }
          ${
            category
              ? `taxQuery: {
            relation: OR
            taxArray: [
              {
                terms: $category
                taxonomy: CATEGORY
                operator: IN
                field: SLUG
              }
            ]
          }`
              : ``
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
            id
            name
            nicename
            nickname
            username
          }
          commentCount
          comments {
            nodes {
              author {
                ... on CommentAuthor {
                  id
                  name
                }
              }
              content
              commentId
              date
              commentACF {
                likes
              }
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
};

const News = ({ posts, categories, query }) => {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const stateLink = useStateLink(
    loaded ? NewsStore : CreateNewsStore(loaded, { categories, ...query })
  );

  const { sorting, filters, isChanged } = stateLink.get();

  const { currentSorting, defaultSorting } = sorting.reduce((acc, current) => {
    if (current.active) acc.currentSorting = current;
    if (current.default) acc.defaultSorting = current;
    return acc;
  }, {});
  const currentCategory = filters.categories.find((i) => i.active);

  let variables = {
    articles: 10,
    onLoadNumber: 3,
    cursor: null,
  };

  if (currentSorting) {
    variables.sorting = currentSorting.gqlOrderBy;
  }

  if (filters.date) {
    variables = {
      ...variables,
      ...dateToGraphQLQuery(filters.date),
    };
  }

  if (currentCategory) {
    variables.category = [currentCategory.value];
  }

  const { fetchingContent, state } = useLoadMoreHook(
    composeQuery(variables),
    posts,
    'news',
    variables.articles,
    variables.onLoadNumber,
    isChanged,
    (changed) => setIsChanged(changed)
  );

  const updateMobile = () => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    setLoaded(true);

    Router.events.on('routeChangeComplete', () => {
      setIsChanged(true);
    });
  }, []);

  const handleCalendarOpen = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  useEffect(() => {
    updateMobile();

    window.addEventListener('resize', updateMobile);

    return () => {
      window.removeEventListener('resize', updateMobile);
    };
  }, [isMobile]);

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
      <div className="container articles-container">
        <div className="row">
          <main className="col-md-8">
            <div className="news-archive__content">
              <div className="loader-container__desktop">
                <NewsLoader />
                <NewsLoader />
                <NewsLoader />
                <NewsLoader />
                <NewsLoader />
              </div>
              <div className="loader-container__mobile">
                <LineLoader />
                <NewsLoader type={'mobile'} />
                <NewsLoader type={'mobile'} />
                <NewsLoader type={'mobile'} />
                <NewsLoader type={'mobile'} />
                <NewsLoader type={'mobile'} />
                <NewsLoader type={'mobile'} />
              </div>
            </div>
          </main>
          <aside className="news-archive__sidebar-wrapper col-md-4">
            <div className="news-archive__sidebar">
              <SidebarLoader type={'archive'} />
            </div>
          </aside>
        </div>
      </div>
    );
  }
  const { nodes, pageInfo } = state.data;

  return (
    <div className="news-page">
      <Head>
        <title>ЗМІСТ - Новини</title>
      </Head>

      <div className="container articles-container">
        <div className="row">
          {isMobile && (
            <div className="news-archive__mobile col-md-8">
              <button
                className="news-archive__calendar"
                onClick={handleCalendarOpen}
              >
                <Icons icon={'calendar'} />
              </button>
              <div className="pos-relative d-flex news-archive__filter">
                <select
                  className="reset-select news-cats tx-family-titles font-weight-medium pos-relative z-1 outline-none"
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option disabled hidden selected>
                    Категорія
                  </option>
                  {filters.categories.map((item) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>
                <ChevronDown className="pos-absolute pos-center-right" />
              </div>
              <div className="pos-relative d-flex">
                <SortingSelect
                  currentOption={currentSorting}
                  options={sorting}
                  className="reset-select sorting--news text-capitalize tx-family-titles font-weight-medium pos-relative z-1 outline-none"
                  onChange={setSorting}
                />
                <ChevronDown className="pos-absolute pos-center-right" />
              </div>
              {isCalendarOpen && (
                <Calendar
                  onChange={setDate}
                  currentValue={filters.date}
                  classNames={'news-archive__calendar-mobile'}
                />
              )}
            </div>
          )}
          <div className="col-md-8">
            <main className="news-archive__content">
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
          </div>
          <div className="col-md-4">
            <StickyBox
              offsetTop={80}
              offsetBottom={20}
              className={'news-archive__sidebar-wrapper'}
            >
              <SidebarNews
                className="news-archive__sidebar"
                sorting={sorting}
                filters={filters}
                currentCategory={currentCategory}
                currentSorting={currentSorting}
              />
            </StickyBox>
          </div>
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

  const { sorting, date, category } = query;

  if (sorting) {
    const customSorting = NewsStore.get().sorting.find(
      (i) => i.value === sorting
    );
    variables.sorting = customSorting.gqlOrderBy;
  }

  if (date) {
    variables = {
      ...variables,
      ...dateToGraphQLQuery(date),
    };
  }

  if (category) {
    variables.category = [category];
  }

  const { data } = await apolloClient.query({
    query: composeQuery(variables),
    variables: {},
  });
  const { posts, categories } = data;

  return { posts, categories, query };
};

News.propTypes = {
  className: PropTypes.string,
  query: PropTypes.any,
  categories: PropTypes.object,
};

export default News;
