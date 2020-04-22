import React from 'react';

const NewsContext = React.createContext({
  sorting: [
    {
      label: 'останні',
      value: 'latest',
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
  ]
});
export const NewsProvider = NewsContext.Provider;
export default NewsContext;

export const withNewsProvider = ({ children }) => {
  return <NewsProvider>{children}</NewsProvider>;
};
