import React from 'react';
import App from 'next/app';
import '../styles/global.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

// You can comment this method below if you don't want to have every single page rendered on server
// (but looks like we need to have this for Zmist)
// This method disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
}

export default MyApp;
