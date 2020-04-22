import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import Select, { components } from 'react-select';

import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import ChevronDown from '~/static/images/chevron-down';
import Times from '~/static/images/times-small';
import SearchIcon from '~/static/images/search';

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

const Search = (props) => {
  const optionsTag = [
    {
      value: 'новини',
      label: 'Новини',
    },
    {
      value: 'публікації',
      label: 'Публікації',
      isFixed: true,
    },
    {
      value: 'блоги',
      label: 'Блоги',
    },
    {
      value: 'відео',
      label: 'Відео',
    },
    {
      value: 'події',
      label: 'Події',
    },
    {
      value: 'збір-коштів',
      label: 'Збір коштів',
    },
    {
      value: 'можливості',
      label: 'Можливості',
    },
  ];

  const optionsCat = [
    {
      value: 'політика',
      label: 'Політика',
    },
    {
      value: 'освіта',
      label: 'Освіта',
    },
    {
      value: "здоров'я",
      label: "Здоров'я",
    },
    {
      value: 'спорт',
      label: 'Спорт',
    },
    {
      value: 'культура',
      label: 'Культура',
    },
    {
      value: 'політика',
      label: 'Політика',
    },
    {
      value: 'економіка-і-бізнес',
      label: 'Економіка і бізнес',
    },
    {
      value: 'суспільство',
      label: 'Суспільство',
    },
    {
      value: 'історії-успіху',
      label: 'Історії успіху',
    },
  ];

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

  const colorStyles = {
    valueContainer: (styles) => ({
      ...styles,
      paddingLeft: 0,
      paddingRight: 0,
    }),
    placeholder: (styles) => ({ ...styles, color: '#242424' }),
    control: (styles) => ({
      ...styles,
      border: 'none',
      borderRadius: 0,
      paddingLeft: 12,
      paddingRight: 15,
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
      marginBottom: 0,
      borderRadius: 0,
      left: 0,
      boxShadow: '0px -6px 6px white, 0px 0px 6px rgba(0, 0, 0, 0.25)',
    }),
    menuList: (styles) => ({ ...styles, paddingTop: 0, paddingBottom: 0 }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: 'none',
    }),
  };

  const { fetchingContent, state } = useLoadMoreHook(
    SEARCH_QUERY,
    props,
    'news'
  );

  if (!state.data.nodes) {
    return (
      <div>
        <NewsLoader />
        <NewsLoader />
        <NewsLoader />
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

      <main>
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="search-form__field-wrapper pos-relative">
                  <input
                    className="search-form__field tx-family-titles font-weight-semibold w-100"
                    type="search"
                    // value="Полтава"
                    placeholder="Пошук"
                  />
                  <button className="search-form__button pos-absolute pos-center-right">
                    <SearchIcon />
                  </button>
                </div>
                <form className="search-form d-flex">
                  <ul className="search-form__row tx-small list-unstyled">
                    <li className="search-form__text search-form__col">
                      <input
                        className="search-form__radio"
                        type="radio"
                        id="text"
                        name="searchBy"
                      />
                      <label className="search-form__label" for="text">
                        Текст
                      </label>
                    </li>
                    <li className="search-form__authors search-form__col">
                      <input
                        className="search-form__radio"
                        type="radio"
                        id="author"
                        name="searchBy"
                      />
                      <label className="search-form__label" for="author">
                        Автори
                      </label>
                    </li>
                    <li className="search-form__tags search-form__col">
                      <input
                        className="search-form__radio"
                        type="radio"
                        id="tags"
                        name="searchBy"
                      />
                      <label className="search-form__label" for="tags">
                        Теги
                      </label>
                    </li>
                  </ul>
                  <Select
                    classNamePrefix="react-select"
                    className="tx-tiny search-form__col search-form__col--select"
                    isClearable
                    options={optionsTag}
                    placeholder="Тип"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="tx-tiny search-form__col search-form__col--select"
                    isClearable
                    options={optionsCat}
                    placeholder="Категорії"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="tx-tiny search-form__col search-form__col--select"
                    isClearable
                    options={optionsPubdate}
                    placeholder="Період"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="tx-tiny search-form__col search-form__col--select"
                    isClearable
                    options={optionsShow}
                    placeholder="Показати"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="container">
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
          </div>
        </>
      </main>
    </div>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props) => {
  const {
    children = <Times />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
      className="react-select__indicator react-select__clear-indicator"
    >
      {children}
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
  const { posts } = data;
  return posts;
};

export default Search;
