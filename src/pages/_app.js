import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import getConfig from 'next/config';
import axios from 'axios';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import apolloClient from '~/lib/ApolloClient';
import { AuthStore, updateToken } from '~/stores/Auth';
import '../styles/app.scss';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const ZmistApp = ({ Component, pageProps, zmistAdditional }) => {
  useEffect(() => {
    if (zmistAdditional && zmistAdditional.token) {
      updateToken(zmistAdditional.token);
    }
  }, []);
  useEffect(() => {
    return () => {
      if (document.querySelector('body') && document.querySelector('.header')) {
        document.querySelector('body').classList.remove('isB-MenuOpen');
        document.querySelector('.header').classList.remove('isMenuOpen');
      }
    };
  }, [pageProps]);

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
  const authStore = AuthStore.get();
  const zmistAdditional = {};
  if (!authStore || !authStore.token) {
    const { apiUrl, apiUser, apiPass } = config;
    const { data } = await axios.post(`${apiUrl}/wp-json/jwt-auth/v1/token`, {
      username: apiUser,
      password: apiPass,
    });
    if (data && data.token) {
      zmistAdditional.token = data.token;
    }
  }

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, zmistAdditional };
};

export default ZmistApp;
