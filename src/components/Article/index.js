import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

import ArticleNews from '~/components/Article/News';
import ArticleOpportunities from '~/components/Article/Opportunities';
import ArticleEvents from '~/components/Article/Events';
import { ArticleProvider } from '~/components/Article/Context';
import ArticleBlogs from '~/components/Article/Blogs';
import ArticlePublications from '~/components/Article/Publications';
import PublicationsCats from '~/components/Article/PublicationsCats';
import ArticleCrowdfundings from '~/components/Article/Crowdfundings';

const Article = ({ type, display, className, ...props }) => {
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
    case 'others': {
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
    case 'crowdfundings': {
      return (
        <ArticleProvider value={type} display={display}>
          <ArticleCrowdfundings
            className={classnames('article', className)}
            {...props}
          />
        </ArticleProvider>
      );
    }
    case 'publications-cats': {
      return (
        <ArticleProvider value={'publications'}>
          <PublicationsCats className={classnames('', className)} {...props} />
        </ArticleProvider>
      );
    }
    default:
      return null;
  }
};

Article.propTypes = {
  type: PropTypes.string,
  display: PropTypes.string,
  className: PropTypes.string,
};

export default Article;
