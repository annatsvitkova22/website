import React from 'react';
import * as classnames from 'classnames';

const ArticleDateTime = ({ date, time, className }) => {
  return (
    <div className={classnames('meta-date-group', className)}>
      <p className="meta-date-group__day">24</p>
      <p className="meta-date-group__month">Березня</p>
      <time dateTime={date} className="meta-date-group__time">
        {time}
      </time>
    </div>
  );
};

export default ArticleDateTime;
