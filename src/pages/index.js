import React from 'react'
import Head from 'next/head'
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <Header/>

    <main>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>
    </main>

    <Footer />
  </div>
)

export default Home
