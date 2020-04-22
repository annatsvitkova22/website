import { createStateLink } from '@hookstate/core';

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
