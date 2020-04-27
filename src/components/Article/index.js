import React from 'react';
import * as classnames from 'classnames';

import ArticleNews from '~/components/Article/News';
import ArticleOpportunities from '~/components/Article/Opportunities';
import ArticleEvents from '~/components/Article/Events';
import { ArticleProvider } from '~/components/Article/Context';
import ArticleBlogs from '~/components/Article/Blogs';

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
    case 'blogs': {
      return (
        <ArticleProvider value={type}>
          <ArticleBlogs
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
    case 'events': {
      return (
        <ArticleProvider value={type}>
          <ArticleEvents
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
