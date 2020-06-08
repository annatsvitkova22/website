import { readFileSync } from 'fs';

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import CustomHead from 'next-critical';

let styleSheetContent = '';

class ZmistDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const filePath = `./src/styles/critical.css`;
    styleSheetContent = readFileSync(filePath, 'utf8');
    return { ...initialProps };
  }

  /* eslint-disable class-methods-use-this */
  render() {
    const CriticalCssHead = CustomHead(Head, styleSheetContent);

    return (
      <Html lang="uk-UA">
        <CriticalCssHead />

        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ZmistDocument;
