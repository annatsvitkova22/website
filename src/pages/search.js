import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import Select from '~/components/Select';
import apolloClient from '~/lib/ApolloClient';
import NewsLoader from '~/components/Loaders/NewsLoader';
import useLoadMoreHook from '~/hooks/useLoadMoreHook';
import SearchIcon from '~/static/images/search';
import Filter from '~/static/images/filter';

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

  const { fetchingContent, state } = useLoadMoreHook(
    SEARCH_QUERY,
    props,
    'news'
  );

  const [mobile, setMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  function onClick() {
    setShowFilters(!showFilters);
  }

  function onSubmit(e) {
    e.preventDefault();
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
                    className="search-form__field tx-family-titles font-weight-semibold w-100"
                    type="search"
                    // value="Полтава"
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
                  <ul className="search-form__row tx-small list-unstyled">
                    <li className="search-form__text search-form__col">
                      <input
                        className="search-form__radio"
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
                    <Select
                      instanceId="1"
                      options={optionsTag}
                      placeholder="Тип"
                    />
                    <Select
                      instanceId="2"
                      options={optionsCat}
                      placeholder="Категорії"
                    />
                    <Select
                      instanceId="3"
                      options={optionsPubdate}
                      placeholder="Період"
                    />
                    <Select
                      instanceId="4"
                      options={optionsShow}
                      placeholder="Показати"
                    />
                  </div>
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
