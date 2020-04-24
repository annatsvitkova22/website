import { useEffect } from 'react';
import Router from 'next/router';
import { isEqual } from 'lodash';

const useRouterSubscription = (...parameters) => {
  useEffect(() => {
    const { query, pathname } = Router.router;
    const newQuery = {};
    parameters.forEach((param) => {
      if (
        newQuery[param.name] !== param.current
        // param.current !== param.default
      ) {
        newQuery[param.name] = param.current;
      }
      if (newQuery[param.name] === param.default) {
        delete newQuery[param.name];
      }
    });
    if (!isEqual(query, newQuery)) {
      Router.router.replace({
        pathname,
        query: newQuery,
      });
    }
  });
};

export default useRouterSubscription;
