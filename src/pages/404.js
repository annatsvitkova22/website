import React from 'react';
import Head from 'next/head';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>ЗМІСТ - 404</title>
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
