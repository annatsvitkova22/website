import React from 'react';
import * as classnames from 'classnames';

const ArticleExcerpt = ({ className, ...props }) => {
  return (
    <div className={classnames('article-excerpt', className)} {...props} />
  );
};

export default ArticleExcerpt;
