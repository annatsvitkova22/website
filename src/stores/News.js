import { createStateLink } from '@hookstate/core';
import * as moment from 'moment';

export const NewsStore = createStateLink({
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
    date: moment().format(),
    categories: [],
  },
});

export const setSorting = (option) => {
  const newStore = NewsStore.get();
  newStore.sorting.map((i) => {
    const newValue = i;
    newValue.active = newValue.value === option.value;
    return newValue;
  });
  NewsStore.merge(newStore);
};

export const setDate = (date) => {
  const newStore = NewsStore.get();
  newStore.filters.date = moment(date).format();
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
  const current = newStore.filters.categories.find((i) => i.active);
  const isCurrent = current && current.value === category.value;

  newStore.filters.categories.map((i) => {
    const newValue = i;
    newValue.active = isCurrent ? false : newValue.value === category.value;
    return newValue;
  });
  NewsStore.merge(newStore);
};
