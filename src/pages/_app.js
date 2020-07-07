import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import getConfig from 'next/config';
import axios from 'axios';
import StickyBox from 'react-sticky-box';
import classNames from 'classnames';
import * as _ from 'lodash';
import Router from 'next/router';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import apolloClient from '~/lib/ApolloClient';
import { AuthStore, updateToken } from '~/stores/Auth';
import '../styles/app.scss';
import ScrollTop from '~/components/ScrollTop';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const ZmistApp = ({ Component, pageProps, zmistAdditional }) => {
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const scrollTopCls = classNames({
    'scroll-top__container': true,
    'scroll-top--active': scrollTopVisible,
  });

  let scrollPos = 0;
  let gTimer = null;

  function fixedScroll() {
    const st = window.scrollY;

    if (window.scrollY > window.innerHeight && st > scrollPos) {
      setScrollTopVisible(false);
    } else if (window.scrollY > window.innerHeight && st < scrollPos) {
      const delayFunc = _.throttle(() => {
        setScrollTopVisible(true);

        const start = () => {
          gTimer = setTimeout(() => setScrollTopVisible(false), 5000);
        };

        const clearT = () => {
          clearTimeout(gTimer);
          start();
        };
        const clear = () => {
          clearTimeout(gTimer);
        };

        setScrollTopVisible ? clearT() : clear();
      }, 1000);
      delayFunc();
    }

    scrollPos = st;
  }

  useEffect(() => {
    if (zmistAdditional && zmistAdditional.token) {
      updateToken(zmistAdditional.token);
    }

    const path = Router.router.asPath.split('/');
    if (path.find((item) => item === 'fundraising')) {
      const newPath = path
        .filter((entry) => entry.trim() !== '')
        .slice(1, path.length)
        .join('/');
      Router.push(`/crowdfundings/${newPath}`);
    }
    if (path.find((item) => item === 'analytics')) {
      const newPath = path
        .filter((entry) => entry.trim() !== '')
        .slice(1, path.length)
        .join('/');
      Router.push(`/publications/${newPath}`);
    }

    window.addEventListener('scroll', fixedScrollDebounced);
    return () => {
      window.removeEventListener('scroll', fixedScrollDebounced);
    };
  }, []);

  const fixedScrollDebounced = _.debounce(fixedScroll, 20);

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

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=yes"
        />
        <meta property="og:locale" content="uk-UA" />
        <meta property="og:site_name" content="ЗМІСТ" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@zmist" />
        <meta property="twitter:creator" content="@outright_digital" />
      </Head>
      <Header />
      <div className="main-container">
        <Component {...pageProps} />
        <div className={scrollTopCls}>
          <StickyBox offsetBottom={16} offsetTop={50} bottom>
            <ScrollTop />
          </StickyBox>
        </div>
      </div>
      <Footer />
    </ApolloProvider>
  );
};

ZmistApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
  zmistAdditional: PropTypes.object,
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
