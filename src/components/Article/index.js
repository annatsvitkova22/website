import React from 'react';
import * as classnames from 'classnames';

import ArticleNews from '~/components/Article/News';
import './styles.scss';
import { ArticleProvider } from '~/components/Article/Context';

const Article = ({ type, className, ...props }) => {
  switch (type) {
    case 'news': {
      return (
        <ArticleProvider value={type}>
          <ArticleNews
            className={classnames('article', className)}
            {...props}
          />
        </ArticleProvider>
      );
      break;
    }
    default:
      return null;
  }
};

export default Article;
