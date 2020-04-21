import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

import ChevronDown from '~/static/images/chevron-down';
import Times from '~/static/images/times-small';
import apolloClient from '~/lib/ApolloClient';

const PAGE = gql`
  query Page($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
    }
  }
`;

const Page = (props) => {
  const { page } = props;

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

  return (
    <div className="page">
      <Head>
        <title>{'Пошук'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <input
                className="search-form__field w-100"
                type="search"
                value="Полтава"
              />
              <form className="search-form d-flex">
                <div className="search-form__row tx-small">
                  <div className="search-form__text search-form__col">
                    Текст
                  </div>
                  <div className="search-form__authors search-form__col">
                    Автори
                  </div>
                  <div className="search-form__tags search-form__col">Теги</div>
                  <Select
                    classNamePrefix="react-select"
                    className="search-form__col search-form__col--select"
                    isClearable
                    options={optionsTag}
                    placeholder="Тип"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="search-form__col search-form__col--select"
                    isClearable
                    options={optionsCat}
                    placeholder="Категорії"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="search-form__col search-form__col--select"
                    isClearable
                    options={optionsPubdate}
                    placeholder="Період"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                  <Select
                    classNamePrefix="react-select"
                    className="search-form__col search-form__col--select"
                    isClearable
                    options={optionsShow}
                    placeholder="Показати"
                    styles={colorStyles}
                    components={{ ClearIndicator, DropdownIndicator }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
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

Page.propTypes = {
  page: PropTypes.any,
};

// Page.getInitialProps = async ({ query: { uri } }) => {
//   const { data } = await apolloClient.query({
//     query: PAGE,
//     variables: { uri },
//   });

//   return {
//     page: data.pageBy,
//   };
// };

export default Page;
