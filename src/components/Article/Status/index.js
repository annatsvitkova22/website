import React from 'react';
import * as classnames from 'classnames';

const ArticleStatus = ({ className, label, color }) => {
  return (
    <div
      className={classnames(
        'article-status',
        `article-status--${color}`,
        className
      )}
    >
      {label}
    </div>
  );
};

export default ArticleStatus;
