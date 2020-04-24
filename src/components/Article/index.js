import React from 'react';
import * as classnames from 'classnames';

import ArticleNews from '~/components/Article/News';
import ArticleOpportunities from '~/components/Article/Opportunities';
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
    case 'opportunities': {
      return (
        <ArticleProvider value={type}>
          <ArticleOpportunities
            className={classnames('article', className)}
            {...props}
          />
        </ArticleProvider>
      );
    }
    default:
      return null;
  }
};

export default Article;
