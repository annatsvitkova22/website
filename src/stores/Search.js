import { createStateLink } from '@hookstate/core';
import * as moment from 'moment';
import { cloneDeep } from 'lodash';

export const initialState = {
  sorting: [
    {
      label: 'Останні',
      value: 'recent',
      default: true,
      active: true,
      gqlOrderBy: {
        field: 'DATE',
        order: 'DESC',
      },
    },
    // TODO: implement backend
    // {
    //   label: 'найбільше переглядів',
    //   value: 'most-viewable',
    // },
    // {
    //   label: 'найбільше коментарів',
    //   value: 'most-commented',
    // },
    {
      label: 'Спочатку старі',
      value: 'old',
      gqlOrderBy: {
        field: 'DATE',
        order: 'ASC',
      },
    },
  ],
  filters: {
    q: undefined,
    by: [
      {
        label: 'Текст',
        value: 'text',
        default: true,
        active: true,
      },
      {
        label: 'Автор',
        value: 'author',
      },
      {
        label: 'Тег',
        value: 'tag',
      },
    ],
    types: [],
    categories: [],
    period: [
      {
        label: 'За тиждень',
        value: 'week',
        gqlDateQuery: {
          after: moment().subtract(1, 'week').format('YYYY-MM-DD'),
          before: moment().format('YYYY-MM-DD'),
        },
      },
      {
        label: 'За місяць',
        value: 'month',
        gqlDateQuery: {
          after: moment().subtract(1, 'month').format('YYYY-MM-DD'),
          before: moment().format('YYYY-MM-DD'),
        },
      },
      {
        label: 'За 3 місяці',
        value: '3-month',
        gqlDateQuery: {
          after: moment().subtract(3, 'month').format('YYYY-MM-DD'),
          before: moment().format('YYYY-MM-DD'),
        },
      },
      {
        label: 'За 6 місяці',
        value: '6-month',
        gqlDateQuery: {
          after: moment().subtract(6, 'month').format('YYYY-MM-DD'),
          before: moment().format('YYYY-MM-DD'),
        },
      },
      {
        label: 'За рік',
        value: 'year',
        gqlDateQuery: {
          after: moment().subtract(1, 'year').format('YYYY-MM-DD'),
          before: moment().format('YYYY-MM-DD'),
        },
      },
    ],
  },
  isChanged: false,
};
export const SearchStore = createStateLink(initialState);

export const setIsChanged = (st = false) => {
  const newState = SearchStore.get();
  newState.isChanged = st;
  SearchStore.merge(newState);
};

export const CreateSearchStore = (
  loaded,
  { types, categories, q, by, type, category, period, sorting } = {}
) => {
  const state = cloneDeep(initialState);
  if (types) {
    const typeLabels = {
      news: 'Новини',
      publications: 'Публікації',
      blogs: 'Блоги',
      videos: 'Відео',
      events: 'Події',
      crowdfundings: 'Збір коштів',
      opportunities: 'Можливості',
    };
    const t = Object.keys(types)
      .filter((type) => type !== 'categories')
      .map((type) => {
        const quantity = types[type].pageInfo ? types[type].pageInfo.total : 0;
        return {
          label: typeLabels[type === 'posts' ? 'news' : type],
          value: type === 'posts' ? 'news' : type,
          quantity,
        };
      });
    state.filters.types = t;
  }
  if (categories) {
    state.filters.categories = categories.map((i) => {
      const updatedItem = cloneDeep(i);
      updatedItem.label = updatedItem.name;
      delete updatedItem.name;
      updatedItem.value = updatedItem.slug;
      delete updatedItem.slug;
      return updatedItem;
    });
  }

  if (q) {
    state.filters.q = q;
  }

  if (by) {
    state.filters.by.map((i) => {
      const newValue = i;
      newValue.active = newValue.value === by;
      return newValue;
    });
  }

  if (type) {
    state.filters.types.map((i) => {
      const newValue = i;
      newValue.active = type === newValue.value;
      return newValue;
    });
  }

  if (category) {
    state.filters.categories.map((i) => {
      const newValue = i;
      newValue.active = category === newValue.value;
      return newValue;
    });
  }

  if (period) {
    state.filters.period.map((i) => {
      const newValue = i;
      newValue.active = period === newValue.value;
      return newValue;
    });
  }

  if (sorting) {
    state.sorting.map((i) => {
      const newValue = i;
      newValue.active = newValue.value === sorting;
      return newValue;
    });
  }
  SearchStore.set(state);
  return SearchStore;
};

export const setSearchQuery = (q) => {
  const newStore = SearchStore.get();
  newStore.filters.q = q;
  SearchStore.set(newStore);
};

export const setBy = (value) => {
  const newStore = SearchStore.get();
  const current = newStore.filters.by.find((i) => i.active);
  const isCurrent = current && current.value === value;
  if (isCurrent) return;
  newStore.filters.by.map((i) => {
    const newValue = i;
    newValue.active = newValue.value === value;
    return newValue;
  });
  SearchStore.set(newStore);
};

export const setFilter = (name, value) => {
  const newStore = SearchStore.get();
  const current = newStore.filters[name].find((i) => i.active);
  const isCurrent = current && current.value === value;
  if (isCurrent) return;
  newStore.filters[name].map((i) => {
    const newValue = i;
    newValue.active = newValue.value === value;
    return newValue;
  });
  SearchStore.set(newStore);
};

export const setSorting = (option) => {
  const newStore = SearchStore.get();
  const current = newStore.sorting.find((i) => i.active);
  const isCurrent = current && current.value === option;
  if (isCurrent) return;
  newStore.sorting.map((i) => {
    const newValue = i;
    newValue.active = newValue.value === option;
    return newValue;
  });
  if (!newStore.sorting.find((i) => i.active)) {
    newStore.sorting.find((i) => i.default).active = true;
  }
  SearchStore.set(newStore);
};
