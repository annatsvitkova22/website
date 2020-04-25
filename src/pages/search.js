import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';
import * as classnames from 'classnames';

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
} from '~/stores/Search';
import useRouterSubscription from '~/hooks/useRouterSubscription';
import { setIsChanged } from '~/stores/News';

const SEARCH_QUERY = gql`
  query SearchQuery($cursor: String) {
    posts(first: 5, before: $cursor) {
      nodes {
        id
        excerpt
        title
        slug
      }
      pageInfo {
        endCursor
        total
      }
    }
  }
`;

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
    () => {
      setIsChanged(true);
    },
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

  const [mobile, setMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const typesFormated = filters.types.map(
    ({ quantity, label, value, active }) => {
      return {
        active,
        value,
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
  }, [mobile]);

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

  return (
    <div className="search-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="search-main">
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
                    type="button"
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
                  {mobile && (
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
                          className="tx-tiny tx-family-titles search-form__col--select"
                          key={i}
                          instanceId={i}
                          name={name}
                          options={options}
                          placeholder={placeholder}
                          onChange={onChangeSelect}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </main>
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
    query: SEARCH_QUERY,
    variables: {
      cursor: null,
    },
  });

  // const responseCats = await apolloClient.query({
  //   query: CATEGORIES_QUANTITY,
  // });

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
