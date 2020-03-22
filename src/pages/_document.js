import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class ZmistDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  /* eslint-disable class-methods-use-this */
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ZmistDocument;
