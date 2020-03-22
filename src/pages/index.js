import React from 'react';
import Head from 'next/head';

const Home = () => (
  <div className="container">
    <Head>
      <title>Next Home Page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>
    </main>
  </div>
);

export default Home;
