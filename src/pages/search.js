import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import Select from '~/components/Select';
import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import SearchIcon from '~/static/images/search';
import Filter from '~/static/images/filter';
import queryReducer from '~/hooks/queryReducer';

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

const Search = (props) => {
  const [mobile, setMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchState, setSearchState] = useState({
    posts: props ? props.posts : {},
    types: props ? props.types : {},
    categories: props ? props.categories : [],
    query: Router.router ? Router.router.query : {},
  });

  const { posts, types, categories, query } = searchState;
  console.log(query);

  const typeLabels = {
    posts: 'Новини',
    publications: 'Публікації',
    blogs: 'Блоги',
    videos: 'Відео',
    events: 'Події',
    crowdfundings: 'Збір коштів',
    opportunities: 'Можливості',
  };

  let typesFormated = Object.keys(types).map((type) => {
    if (type !== 'categories') {
      const quantity = types[type].pageInfo ? types[type].pageInfo.total : 0;
      return {
        value: type,
        label: (
          <span>
            {typeLabels[type]} <span className="tx-green">{quantity}</span>
          </span>
        ),
      };
    }
    return '';
  });
  typesFormated = typesFormated.filter((el) => el !== '');

  const categoriesFormated = categories.map(({ count = 0, slug, name }) => {
    return {
      value: slug,
      label: (
        <span>
          {name} <span className="tx-green">{count}</span>
        </span>
      ),
    };
  });

  const optionsPubdate = [
    {
      value: 'week',
      label: 'За тиждень',
    },
    {
      value: 'month',
      label: 'За місяць',
    },
    {
      value: '3-months',
      label: 'За 3 місяці',
    },
    {
      value: '6-months',
      label: 'За 6 місяців',
    },
    {
      value: 'year',
      label: 'За рік',
    },
  ];

  const optionsShow = [
    {
      value: 'last',
      label: 'Останні',
    },
    {
      value: 'last',
      label: 'Найбільше переглядів',
    },
    {
      value: 'last',
      label: 'Найбільше коментарів',
    },
    {
      value: 'last',
      label: 'Спочатку старі',
    },
  ];

  const selects = [
    {
      name: 'type',
      placeholder: 'Тип',
      options: typesFormated,
    },
    {
      name: 'cat',
      placeholder: 'Категорії',
      options: categoriesFormated,
    },
    {
      name: 'pubd',
      placeholder: 'Період',
      options: optionsPubdate,
    },
    {
      name: 'show',
      placeholder: 'Показати',
      options: optionsShow,
    },
  ];

  // const { fetchingContent, state } = useLoadMoreHook(
  //   SEARCH_QUERY,
  //   props.posts,
  //   'news'
  // );

  const updateMobile = () => {
    window.outerWidth < 768 ? setMobile(true) : setMobile(false);
  };

  useEffect(() => {
    setSearchState((state) => ({
      ...state,
      query: searchState.query,
    }));

    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => {
      window.removeEventListener('resize', updateMobile);
    };
  }, [mobile]);

  // if (!state.data.nodes) {
  //   return (
  //     <div>
  //       <NewsLoader />
  //       <NewsLoader />
  //       <NewsLoader />
  //     </div>
  //   );
  // }
  // const { nodes, pageInfo } = state.data;

  function onClick() {
    setShowFilters(!showFilters);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  function onChangeField({ target: { name, value } }) {
    if (value.length > 1) {
      const queryUpdated = queryReducer(query, 'change-field', name, value);

      Router.push({
        pathname: '/search',
        query: { ...queryUpdated },
      });
    }
  }

  function onChangeRadio({ target: { name, value } }) {
    const queryUpdated = queryReducer(query, 'change-radio', name, value);

    Router.push({
      pathname: '/search',
      query: { ...queryUpdated },
    });
  }

  function onChangeSelect(e, { action, name }) {
    const value = e ? e.value : '';
    const queryUpdated = queryReducer(query, action, name, value);

    Router.push({
      pathname: '/search',
      query: { ...queryUpdated },
    });
  }

  return (
    <div className="news-page">
      <Head>
        {/* TODO: change title */}
        <title>{'Change this!'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="search-form__field-wrapper pos-relative">
                  <input
                    onChange={onChangeField}
                    className="search-form__field tx-family-titles font-weight-semibold w-100"
                    type="search"
                    name="searchField"
                    placeholder="Пошук"
                  />
                  <button
                    type="button"
                    className="search-form__button pos-absolute pos-center-right"
                  >
                    <SearchIcon />
                  </button>
                </div>
                <form
                  onSubmit={onSubmit}
                  className="search-form d-flex justify-content-between flex-wrap flex-md-nowrap"
                >
                  <ul
                    className="search-form__row tx-small list-unstyled"
                    onChange={onChangeRadio}
                  >
                    <li className="search-form__text search-form__col">
                      <input
                        className="search-form__radio"
                        value="text"
                        type="radio"
                        id="text"
                        name="searchBy"
                      />
                      <label className="search-form__label" htmlFor="text">
                        Текст
                      </label>
                    </li>
                    <li className="search-form__authors search-form__col">
                      <input
                        className="search-form__radio"
                        value="author"
                        type="radio"
                        id="author"
                        name="searchBy"
                      />
                      <label className="search-form__label" htmlFor="author">
                        Автори
                      </label>
                    </li>
                    <li className="search-form__tags search-form__col">
                      <input
                        className="search-form__radio"
                        value="tags"
                        type="radio"
                        id="tags"
                        name="searchBy"
                      />
                      <label className="search-form__label" htmlFor="tags">
                        Теги
                      </label>
                    </li>
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
                    } flex-column flex-md-row`}
                  >
                    {selects.map(({ name, placeholder, options }, i) => (
                      <Select
                        key={i}
                        instanceId={i}
                        name={name}
                        options={options}
                        placeholder={placeholder}
                        onChange={onChangeSelect}
                      />
                    ))}

                    {/* {mobile && (
                      <>
                        <select name="tag" id="" className="tx-family-titles">
                          <option value="" disabled selected>
                            Тип
                          </option>
                          {optionsTag.map(({ value, label }, i) => (
                            <option key={i} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </>
                    )} */}
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div className="container">
            {nodes.map((post, i) => (
              <article key={post.id}>
                <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                  <a href={`/news/${post.slug}`}>
                    <h3>{post.title}</h3>
                  </a>
                </Link>
                <div>{post.excerpt}</div>
                {i === nodes.length - 1 && i < pageInfo.total - 1 && (
                  <Waypoint onEnter={fetchingContent} />
                )}
              </article>
            ))}
            {state.isLoading && <NewsLoader />}
          </div> */}
        </>
      </main>
    </div>
  );
};

Search.propTypes = {
  posts: PropTypes.any,
};

Search.getInitialProps = async () => {
  if (process.browser) {
    return {};
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
    types: responseQuant.data,
    categories: responseQuant.data.categories.nodes,
  };
};

export default Search;
