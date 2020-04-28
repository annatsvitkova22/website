import React from 'react';
import * as classnames from 'classnames';

import ArticleNews from '~/components/Article/News';
import ArticleOpportunities from '~/components/Article/Opportunities';
import { ArticleProvider } from '~/components/Article/Context';
import ArticleBlogs from '~/components/Article/Blogs';
import ArticlePublications from '~/components/Article/Publications';
import PublicationsCats from '~/components/Article/PublicationsCats';

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
    case 'publications': {
      return (
        <ArticleProvider value={type}>
          <ArticlePublications
            className={classnames('', className)}
            {...props}
          />
        </ArticleProvider>
      );
    }
    case 'publications-cats': {
      return (
        <ArticleProvider value={type}>
          <PublicationsCats className={classnames('', className)} {...props} />
        </ArticleProvider>
      );
    }
    default:
      return null;
  }
};

export default Article;
