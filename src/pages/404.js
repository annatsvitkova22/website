import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import Link from 'next/link';

import gif from '../static/images/c8d18b302cf9135d66bc32770c5b1316.gif';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const NotFound = () => {
  return (
    <>
      <Head>
        <title>ЗМІСТ - 404</title>

        <meta name="title" content="ЗМІСТ - Зміни створюєш ти!" />
        <meta
          name="description"
          content="Ресурс ЗМІСТ – це платформа для активних полтавців, не байдужих до долі рідного міста."
        />
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
      </Head>
      <div className={'not-found'}>
        <div
          className="not-found__outer"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), url('${gif}') no-repeat center / cover`,
          }}
        />
        <div className="not-found__text">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__message">Хтось спалив сторінку...</p>
          <Link href={'/'}>
            <a href="/" className="not-found__button">
              На Головну
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
