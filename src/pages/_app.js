import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import Head from 'next/head';
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
      <Head>
        <title>ЗМІСТ</title>

        <link rel="canonical" href={`${config.frontUrl}`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="ЗМІСТ - Зміни створюєш ти!" />
        <meta
          name="description"
          content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
        />
        <meta property="og:locale" content="uk-UA" />
        <meta property="og:site_name" content="ЗМІСТ" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${config.frontUrl}`} />
        <meta property="og:title" content="ЗМІСТ - Зміни створюєш ти!" />
        <meta
          property="og:description"
          content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
        />
        <meta property="og:image" content="/zmist.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${config.frontUrl}`} />
        <meta property="twitter:title" content="ЗМІСТ - Зміни ствоюєш ти!" />
        <meta
          property="twitter:description"
          content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
        />
        <meta property="twitter:image" content="/zmist.jpg" />
        <meta property="twitter:site" content="@zmist" />
        <meta property="twitter:creator" content="@outright_digital" />
      </Head>
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
