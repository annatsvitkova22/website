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
    categories: []
  }
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
