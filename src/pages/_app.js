import fetch from 'node-fetch';
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import getConfig from 'next/config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import '../styles/global.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.NODE_ENV);

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: config.graphql,
    fetch,
  }),
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
};

// You can comment this method below if you don't want to have every single page rendered on server
// (but looks like we need to have this for Zmist)
// This method disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
