import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import getConfig from 'next/config';
import axios from 'axios';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import apolloClient from '~/lib/ApolloClient';
import '../styles/app.scss';
import { updateToken } from '~/stores/Auth';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const ZmistApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const { apiUrl, apiUser, apiPass } = config;
    axios
      .post(`${apiUrl}/wp-json/jwt-auth/v1/token`, {
        username: apiUser,
        password: apiPass,
      })
      .then((res) => {
        const { data } = res;
        if (data && data.token) {
          updateToken(data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
};

ZmistApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

// You can comment this method below if you don't want to have every single page rendered on server
// (but looks like we need to have this for Zmist)
// This method disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
ZmistApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default ZmistApp;
