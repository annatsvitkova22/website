import { createStateLink } from '@hookstate/core';
import * as moment from 'moment';
import { cloneDeep } from 'lodash';

export const initialState = {
  sorting: [
    {
      label: 'останні',
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
      label: 'спочатку старі',
      value: 'old',
      gqlOrderBy: {
        field: 'DATE',
        order: 'ASC',
      },
    },
  ],
  filters: {
    date: undefined,
    categories: [],
  },
  isChanged: false,
};
export const NewsStore = createStateLink(initialState);

export const setIsChanged = (st = false) => {
  const newState = NewsStore.get();
  newState.isChanged = st;
  NewsStore.merge(newState);
}

export const CreateNewsStore = (
  loaded,
  { categories, sorting, date, category } = {}
) => {
  const state = cloneDeep(initialState);
  if (categories) {
    state.filters.categories = categories.nodes.map((i) => {
      const updatedItem = cloneDeep(i);
      updatedItem.label = updatedItem.name;
      delete updatedItem.name;
      updatedItem.value = updatedItem.slug;
      delete updatedItem.slug;
      return updatedItem;
    });
  }
  if (sorting) {
    state.sorting.map((i) => {
      const newValue = i;
      newValue.active = newValue.value === sorting;
      return newValue;
    });
  }
  if (date) {
    state.filters.date = moment(date).format('YYYY-MM-DD');
  }
  if (category) {
    state.filters.categories.map((i) => {
      const newValue = i;
      newValue.active = category === newValue.value;
      return newValue;
    });
  }
  NewsStore.set(state);
  return NewsStore;
};

export const setSorting = (option) => {
  const newStore = NewsStore.get();
  const current = newStore.filters.categories.find((i) => i.active);
  const isCurrent = current && current.value === option;
  if (isCurrent) return;
  newStore.sorting.map((i) => {
    const newValue = i;
    newValue.active = newValue.value === option;
    return newValue;
  });
  NewsStore.set(newStore);
};

export const setDate = (date) => {
  const newStore = NewsStore.get();
  if (newStore.filters.date) {
    if (moment(newStore.filters.date).isSame(date, 'day')) {
      newStore.filters.date = undefined;
    } else {
      newStore.filters.date = moment(date).format('YYYY-MM-DD');
    }
  } else {
    newStore.filters.date = moment(date).format('YYYY-MM-DD');
  }
  NewsStore.set(newStore);
};

export const setCategories = (categories) => {
  const currentStore = NewsStore.get();
  currentStore.filters.categories = categories.nodes.map((i) => {
    const updatedItem = i;
    updatedItem.label = updatedItem.name;
    delete updatedItem.name;
    updatedItem.value = updatedItem.slug;
    delete updatedItem.slug;
    return updatedItem;
  });
  NewsStore.set(currentStore);
};

export const setCategory = (category) => {
  const newStore = NewsStore.get();
  if (category === null) {
    newStore.filters.categories = [];
    return NewsStore.merge(newStore);
  }
  const current = newStore.filters.categories.find((i) => i.active);
  const isCurrent = current && current.value === category;

  newStore.filters.categories.map((i) => {
    const newValue = i;
    newValue.active = isCurrent ? false : newValue.value === category;
    return newValue;
  });
  NewsStore.merge(newStore);
};
