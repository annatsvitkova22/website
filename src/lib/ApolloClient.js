import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import getConfig from 'next/config';
import { setContext } from 'apollo-link-context';

import introspectionQueryResultData from './fragmentTypes';

import { AuthStore } from '~/stores/Auth';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink({
  uri: config.graphql,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const authStore = AuthStore.get();
  const { token } = authStore;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher }),
  defaultOptions,
});

export default apolloClient;
