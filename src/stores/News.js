import { createStateLink } from '@hookstate/core';
import * as moment from 'moment';

const initialState = {
  sorting: [
    {
      label: 'останні',
      value: 'recent',
      default: true,
      active: true,
    },
    {
      label: 'найбільше переглядів',
      value: 'most-viewable',
    },
    {
      label: 'найбільше коментарів',
      value: 'most-commented',
    },
    {
      label: 'спочатку старі',
      value: 'old',
    },
  ],
  filters: {
    date: undefined,
    categories: [],
  },
};

export const NewsStore = createStateLink(initialState);

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
  NewsStore.merge(newStore);
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
  NewsStore.merge(newStore);
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
  NewsStore.merge(currentStore);
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
