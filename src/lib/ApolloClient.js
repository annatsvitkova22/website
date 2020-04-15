import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import getConfig from 'next/config';

import introspectionQueryResultData from './fragmentTypes';

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

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: config.graphql,
    fetch,
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
  defaultOptions
});

export default apolloClient;
