import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';
import * as classnames from 'classnames';
import { Waypoint } from 'react-waypoint';
import { Router } from 'next/router';
import stringSimilarity from 'string-similarity';

import Select from '~/components/Select';
import apolloClient from '~/lib/ApolloClient';
import SearchIcon from '~/static/images/search';
import Filter from '~/static/images/filter';
import dateToGraphQLQuery from '~/util/date';
import {
  CreateSearchStore,
  SearchStore,
  setBy,
  setFilter,
  setSearchQuery,
  setSorting,
  setIsChanged,
  updateQuery,
} from '~/stores/Search';
import useRouterSubscription from '~/hooks/useRouterSubscription';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import ChronologicalSeparator from '~/components/ChronologicalSeparator';
import composeTaxQuery from '~/util/taxQuery';
import { ArticleProvider } from '~/components/Article/Context';
import ArticleSearch from '~/components/Article/Search';
import SearchbarLoader from '~/components/Loaders/SearchbarLoader';

const sharedNodes = `id
          title
          slug
          featuredImage {
            mediaItemUrl
          }
          author {
            name
            nicename
            nickname
            slug
            userId
            username
          }
          date`;
const singlePostType = `
        nodes { ${sharedNodes} }
        pageInfo {
          endCursor
          total
        }`;
const allPostTypes = `nodes {
          ... on Post {
        ${sharedNodes}
      }
      ... on Publication {
        ${sharedNodes}
      }
      ... on Blog {
        ${sharedNodes}
      }
      ... on Crowdfunding {
        ${sharedNodes}
      }
      ... on Event {
        ${sharedNodes}
      }
      ... on Opportunity {
        ${sharedNodes}
      }
      ... on Other {
        ${sharedNodes}
      }
      ... on Video {
        ${sharedNodes}
      }
      ... on Page {
        ${sharedNodes}
      }
    }
    pageInfo {
      endCursor
      total
    }`;

const innerQuery = ({ type, category, q, period, sorting, tag, author }) => {
  let authorId;
  if (author) {
    const { users } = SearchStore.get();
    const userNames = users.map((u) => u.name);
    const bestMatch = stringSimilarity.findBestMatch(q, userNames);
    authorId = users[bestMatch.bestMatchIndex].userId;
  }
  return `${type === 'news' ? `posts` : type}(
        where: {
          ${q && !tag && !author ? `search: "${q}"` : ``}
          ${author ? `author: ${authorId}` : ``}
          ${
            category || tag
              ? `taxQuery: {
            relation: OR
            ${composeTaxQuery(
              { type: 'category', terms: category },
              { type: 'tag', terms: tag ? q : '', field: 'name' }
            )}
          }`
              : ``
          }
          ${
            period
              ? `dateQuery: {after: {day: ${period.after.day}, month: ${period.after.month}, year: ${period.after.year}},
              before: {day: ${period.before.day}, month: ${period.before.month}, year: ${period.before.year}}}`
              : ``
          }
          ${
            sorting
              ? `orderby: { field: ${sorting.field}, order: ${sorting.order} }`
              : ``
          }
        }
        first: $articles
        before: $cursor
      ) {
        ${type === 'contentNodes' ? `${allPostTypes}` : `${singlePostType}`}
      }`;
};

const composeQuery = ({
  cursor,
  articles,
  q,
  by = 'text',
  type = 'contentNodes',
  category,
  period,
  sorting,
}) => {
  return gql`
    query SearchQuery(
      $cursor: String = ${cursor}
      $articles: Int = ${articles}
    ) {
      ${
        by === 'text'
          ? `${innerQuery({ type, category, q, period, sorting })}`
          : ``
      }
      ${
        by === 'tag'
          ? `${innerQuery({ type, category, q, period, sorting, tag: q })}`
          : ``
      }
      ${
        by === 'author'
          ? `${innerQuery({ type, category, q, period, sorting, author: q })}`
          : ``
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

const USERS = gql`
  query Users {
    users {
      nodes {
        name
        id
        firstName
        userId
        nickname
        nicename
      }
    }
  }
`;

const Search = ({ posts, categories, types, query, users }) => {
  const [loaded, setLoaded] = useState(false);
  const [searchString, setSearchString] = useState(query.q);
  const stateLink = useStateLink(
    loaded
      ? SearchStore
      : CreateSearchStore(loaded, { types, categories, users, ...query })
  );
  useEffect(() => {
    setLoaded(true);

    Router.events.on('routeChangeComplete', () => {
      setIsChanged(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      updateQuery(query);
    }
  }, [query]);

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
    'search',
    variables.articles,
    variables.onLoadNumber,
    isChanged,
    (changed) => setIsChanged(changed)
  );

  const handleSearchString = () => {
    setSearchQuery(searchString || undefined);
  };

  if (!state.data.nodes) {
    return (
      <div className="search-page">
        <div className="search-main">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <SearchbarLoader />
              </div>
            </div>
          </div>
        </div>
        <main className="search-results">
          <NewsLoader />
          <NewsLoader />
          <NewsLoader />
          <NewsLoader />
          <NewsLoader />
        </main>
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
                    onChange={({ target: { value } }) => setSearchString(value)}
                    className="search-form__field tx-family-titles font-weight-semibold w-100"
                    onKeyPress={({ key }) => {
                      if (key === 'Enter') handleSearchString();
                    }}
                    type="text"
                    name="q"
                    value={searchString}
                    placeholder="Пошук"
                  />
                  <button
                    type="submit"
                    className="search-form__button pos-absolute pos-center-right"
                    onClick={handleSearchString}
                  >
                    <SearchIcon />
                  </button>
                </div>
                <div className="search-form d-flex justify-content-between flex-wrap flex-md-nowrap">
                  <ul className="search-form__row tx-small list-reset">
                    {filters.by.map((i) => {
                      return (
                        <li
                          className={classnames(
                            'search-form__text search-form__col',
                            { 'search-form__text--active': i.active }
                          )}
                          onClick={() => setBy(i.value)}
                          key={i.value}
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
                          }}
                          isClearable={i !== 0}
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
      <main className="search-results">
        <div className="container">
          <div className="row">
            <div className="search-results__wrapper">
              {nodes.map((post, i) => {
                let typeName = `${post.__typename.toLowerCase()}s`;
                if (typeName === 'posts') {
                  typeName = 'news';
                }
                if (typeName === 'opportunitys') {
                  typeName = 'opportunities';
                }
                const showAuthor = !!authorsExcluded.findIndex(
                  (availableType) => availableType !== typeName
                );
                return (
                  <React.Fragment key={i}>
                    <ChronologicalSeparator posts={nodes} currentIndex={i} />
                    <ArticleProvider value={typeName}>
                      <ArticleSearch
                        className={classnames('article')}
                        highlightInTitle={filters.q}
                        post={post}
                        key={post.id}
                        showAuthor={showAuthor}
                        displayType={true}
                      >
                        {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                          <Waypoint onEnter={fetchingContent} />
                        )}
                      </ArticleSearch>
                    </ArticleProvider>
                  </React.Fragment>
                );
              })}
              {state.isLoading && (
                <>
                  <NewsLoader />
                  <NewsLoader />
                  <NewsLoader />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Search.propTypes = {
  posts: PropTypes.any,
};

Search.getInitialProps = async ({ query }) => {
  // TODO: move this query to client side
  const responseQuant = await apolloClient.query({
    query: QUANTITIES,
  });

  const allUsers = await apolloClient.query({
    query: USERS,
  });

  const searchStore = SearchStore.get();
  searchStore.users = allUsers.data.users.nodes;
  SearchStore.set(searchStore);

  if (process.browser) {
    return {
      query,
      users: allUsers.data.users.nodes,
      types: responseQuant.data,
      categories: responseQuant.data.categories.nodes,
    };
  }

  const variables = setQueryVariables(query);

  const { data } = await apolloClient.query({
    query: composeQuery(variables),
    variables: {},
  });

  const currentType = Object.keys(data)[0];
  const posts = data[currentType];

  return {
    posts,
    query,
    users: allUsers.data.users.nodes,
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

const authorsExcluded = [
  'videos',
  'events',
  'crowdfundings',
  'opportunities',
  'different',
];
