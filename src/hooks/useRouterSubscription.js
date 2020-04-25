import { useEffect } from 'react';
import Router from 'next/router';
import { isEqual } from 'lodash';

const useRouterSubscription = (runUpdate = () => {}, ...parameters) => {
  useEffect(() => {
    const { query, pathname } = Router.router;
    const newQuery = { ...query };
    parameters.forEach((param) => {
      // console.log(param.initial, newQuery[param.name]);
      // newQuery[param.name] = param.initial;
      newQuery[param.name] = param.current;
      if (newQuery[param.name] === param.default) {
        delete newQuery[param.name];
      }
    });
    if (!isEqual(query, newQuery)) {
      Router.router.replace({
        pathname,
        query: newQuery,
      });
      runUpdate();
    }
  });
};

export default useRouterSubscription;
