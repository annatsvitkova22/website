import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.NODE_ENV);

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: config.graphql,
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
