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
          <div id="modal" />
          <NextScript />
        </body>
        {process.env.ENV === 'staging' && (
          <script type="text/javascript" src="/scripts/usersnap.js" />
        )}
      </Html>
    );
  }
}

export default ZmistDocument;
