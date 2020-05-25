import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';

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
      <div className={'404'}>
        <div className="container">
          <h1>404 - Сторінку не знайдено</h1>
        </div>
      </div>
    </>
  );
};

export default NotFound;
