import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';
import * as classnames from 'classnames';
import { Waypoint } from 'react-waypoint';
import { Router } from 'next/router';

import Select from '~/components/Select';
import apolloClient from '~/lib/ApolloClient';
import SearchIcon from '~/static/images/search';
import Filter from '~/static/images/filter';
import { dateToGraphQLQuery } from '~/util/date';
import {
  CreateSearchStore,
  SearchStore,
  setBy,
  setFilter,
  setSearchQuery,
  setSorting,
  setIsChanged,
} from '~/stores/Search';
import useRouterSubscription from '~/hooks/useRouterSubscription';
import NewsLoader from '~/components/Loaders/NewsLoader';
import SidebarLoader from '~/components/Loaders/SidebarLoader';
import ActionbarLoader from '~/components/Loaders/ActionbarLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import Article from '~/components/Article';

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
    query SearchQuery(
      $cursor: String = ${cursor}
      $articles: Int = ${articles}
      $day: Int = ${day ? day : null}
      $month: Int = ${month ? month : null}
      $year: Int = ${year ? year : null}
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
};

const QUANTITIES = gql`
  query TypesQuantity {
    categories(where: { hideEmpty: true }) {
      nodes {
        name
        slug
        count
      }
    }
    posts {
      pageInfo {
        total
      }
    }
    blogs {
      pageInfo {
        total
      }
    }
    publications {
      pageInfo {
        total
      }
    }
    videos {
      pageInfo {
        total
      }
    }
    crowdfundings {
      pageInfo {
        total
      }
    }
    events {
      pageInfo {
        total
      }
    }
    opportunities {
      pageInfo {
        total
      }
    }
  }
`;

const Search = ({ posts, categories, types, query }) => {
  const [loaded, setLoaded] = useState(false);
  const stateLink = useStateLink(
    loaded
      ? SearchStore
      : CreateSearchStore(loaded, { types, categories, ...query })
  );
  useEffect(() => {
    setLoaded(true);

    Router.events.on('routeChangeComplete', () => {
      setIsChanged(true);
    });
  }, []);

  const { sorting, filters, isChanged } = stateLink.get();

  const { currentBy, defaultBy } = filters.by.reduce((acc, current) => {
    if (current.active) acc.currentBy = current;
    if (current.default) acc.defaultBy = current;
    return acc;
  }, {});
  const currentType = filters.types.find((i) => i.active);
  const currentCategory = filters.categories.find((i) => i.active);
  const currentPeriod = filters.period.find((i) => i.active);
  const { currentSorting, defaultSorting } = sorting.reduce((acc, current) => {
    if (current.active) acc.currentSorting = current;
    if (current.default) acc.defaultSorting = current;
    return acc;
  }, {});

  useRouterSubscription(
    {
      name: 'q',
      current: filters.q,
      initial: query.q,
    },
    {
      name: 'by',
      current: currentBy ? currentBy.value : undefined,
      default: defaultBy.value,
      initial: query.by,
    },
    {
      name: 'type',
      current: currentType ? currentType.value : undefined,
      initial: query.type,
    },
    {
      name: 'category',
      current: currentCategory ? currentCategory.value : undefined,
      initial: query.category,
    },
    {
      name: 'period',
      current: currentPeriod ? currentPeriod.value : undefined,
      initial: query.period,
    },
    {
      name: 'sorting',
      current: currentSorting.value,
      default: defaultSorting.value,
      initial: query.sorting,
    }
  );

  const [isMobile, setMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const typesFormated = filters.types.map(
    ({ quantity, label, value, active }) => {
      return {
        active,
        value,
        mobileLabel: `${label} ${quantity}`,
        label: (
          <span>
            {label}{' '}
            <span className="tx-green react-select__quantity">{quantity}</span>
          </span>
        ),
      };
    }
  );

  const categoriesFormated = filters.categories.map(
    ({ count = 0, value, label, active }) => {
      return {
        active,
        mobileLabel: `${label} ${count}`,
        value,
        label: (
          <span>
            {label}{' '}
            <span className="tx-green react-select__quantity">{count}</span>
          </span>
        ),
      };
    }
  );

  const selects = [
    {
      name: 'types',
      placeholder: 'Тип',
      options: typesFormated,
    },
    {
      name: 'categories',
      placeholder: 'Категорії',
      options: categoriesFormated,
    },
    {
      name: 'period',
      placeholder: 'Період',
      options: filters.period,
    },
    {
      name: 'sorting',
      placeholder: 'Показати',
      options: sorting,
    },
  ];

  const updateMobile = () => {
    window.outerWidth < 768 ? setMobile(true) : setMobile(false);
  };

  useEffect(() => {
    updateMobile();

    window.addEventListener('resize', updateMobile);

    return () => {
      window.removeEventListener('resize', updateMobile);
    };
  }, [isMobile]);

  function onClick() {
    setShowFilters(!showFilters);
  }

  function onChangeSelect(e, { name }) {
    const value = e ? e.value : '';
    if (name === 'sorting') {
      setSorting(value);
    } else {
      setFilter(name, value);
    }
  }

  const variables = {
    articles: 10,
    onLoadNumber: 3,
    cursor: null,
  };

  if (filters.q) {
    variables.q = filters.q;
  }

  if (currentBy) {
    variables.by = currentBy.value;
  }

  if (currentType) {
    variables.type = currentType.value;
  }

  if (currentCategory) {
    variables.category = [currentCategory.value];
  }

  if (currentPeriod) {
    const { gqlDateQuery } = currentPeriod;
    variables.period = {
      after: dateToGraphQLQuery(gqlDateQuery.after),
      before: dateToGraphQLQuery(gqlDateQuery.before),
    };
  }

  if (currentSorting) {
    variables.sorting = currentSorting.gqlOrderBy;
  }

  const { fetchingContent, state } = useLoadMoreHook(
    composeQuery(variables),
    posts,
    'news',
    variables.articles,
    variables.onLoadNumber,
    isChanged,
    (state) => setIsChanged(state)
  );

  if (!state.data.nodes) {
    return (
      <div className="search-page">
        <div className="search-main">
          <ActionbarLoader />
          <ActionbarLoader />
        </div>
        <div className="search-content container">
          <main className="search-results">
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
            <NewsLoader />
          </main>
          <aside className="search-sidebar">
            <SidebarLoader />
            <SidebarLoader />
          </aside>
        </div>
      </div>
    );
  }
  const { nodes, pageInfo } = state.data;

  return (
    <div className="search-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="search-main">
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="search-form__field-wrapper pos-relative">
                  <input
                    onChange={({ target: { value } }) => setSearchQuery(value)}
                    className="search-form__field tx-family-titles font-weight-semibold w-100"
                    type="text"
                    name="q"
                    value={filters.q}
                    placeholder="Пошук"
                  />
                  <button
                    type="submit"
                    className="search-form__button pos-absolute pos-center-right"
                  >
                    <SearchIcon />
                  </button>
                </div>
                <div className="search-form d-flex justify-content-between flex-wrap flex-md-nowrap">
                  <ul className="search-form__row tx-small list-unstyled">
                    {filters.by.map((i) => {
                      return (
                        <li
                          className={classnames(
                            'search-form__text search-form__col',
                            { current: i.active }
                          )}
                          onClick={() => setBy(i.value)}
                        >
                          {i.label}
                        </li>
                      );
                    })}
                  </ul>
                  {isMobile && (
                    <button
                      onClick={onClick}
                      className={`${showFilters ? 'tx-green' : 'tx-black'}`}
                    >
                      <Filter />
                    </button>
                  )}
                  <div
                    className={`search-form__selects w-100 ${
                      showFilters ? 'd-flex' : 'd-none d-md-flex'
                    } flex-column-reverse flex-md-row-reverse justify-content-between`}
                  >
                    {selects
                      .reverse()
                      .map(({ name, placeholder, options, active }, i) => (
                        <Select
                          key={i}
                          instanceId={i}
                          className="tx-tiny tx-family-titles search-form__col--select"
                          {...{
                            isMobile,
                            name,
                            options,
                            placeholder,
                            // onChangeHtml,
                          }}
                          onChange={onChangeSelect}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="container">
        <div className="search-content row">
          <main className="search-results col-md-8">
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
            {state.isLoading && (
              <>
                <NewsLoader />
                <NewsLoader />
                <NewsLoader />
              </>
            )}
          </main>
          <aside className="search-sidebar col-md-4">
            <SidebarLoader />
            <SidebarLoader />
          </aside>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  posts: PropTypes.any,
};

Search.getInitialProps = async ({ query }) => {
  if (process.browser) {
    return { query };
  }

  const variables = setQueryVariables(query);

  const { data } = await apolloClient.query({
    query: composeQuery(variables),
    variables: {},
  });

  const responseQuant = await apolloClient.query({
    query: QUANTITIES,
  });

  const { posts } = data;

  return {
    posts,
    query,
    types: responseQuant.data,
    categories: responseQuant.data.categories.nodes,
  };
};

export default Search;

const setQueryVariables = (query) => {
  const variables = {
    articles: 10,
    cursor: null,
  };

  const { q, by, type, category, period, sorting } = query;

  if (q) {
    variables.q = q;
  }

  if (by) {
    variables.by = by;
  }

  if (type) {
    variables.type = type;
  }

  if (category) {
    variables.category = [category];
  }

  if (period) {
    const { gqlDateQuery } = SearchStore.get().filters.period.find(
      (i) => i.value === period
    );
    variables.period = {
      after: dateToGraphQLQuery(gqlDateQuery.after),
      before: dateToGraphQLQuery(gqlDateQuery.before),
    };
  }

  if (sorting) {
    const customSorting = SearchStore.get().sorting.find(
      (i) => i.value === sorting
    );
    variables.sorting = customSorting.gqlOrderBy;
  }

  return variables;
};
