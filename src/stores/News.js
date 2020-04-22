import { createStateLink } from '@hookstate/core';

export const newsStore = createStateLink({
  sorting: [
    {
      label: 'останні',
      value: 'latest',
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
      value: 'old-first',
    },
  ],
});

export const setSorting = (option) => {
  const newStore = newsStore.get();
  newStore.sorting.map((i) => {
    const newValue = i;
    newValue.active = newValue.value === option.value;
    return newValue;
  });
  newsStore.set(newStore);
};
