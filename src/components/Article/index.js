import React from 'react';
import * as classnames from 'classnames';

import ArticleNews from '~/components/Article/News';
import './styles.scss';

const Article = ({ type, className, ...props }) => {
  switch (type) {
    case 'news': {
      return (
        <ArticleNews className={classnames('article', className)} {...props} />
      );
      break;
    }
    default:
      return null;
  }
};

export default Article;
