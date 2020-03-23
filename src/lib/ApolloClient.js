import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import getConfig from 'next/config';

import introspectionQueryResultData from './fragmentTypes.json';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.NODE_ENV);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: config.graphql,
    fetch,
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

export default apolloClient;
