import React from 'react';
import * as classnames from 'classnames';

const ArticleDate = ({ date, className }) => {
  return (
    <time className={classnames('meta-date', className)} dateTime={date}>
      {date}
    </time>
  );
};

export default ArticleDate;
