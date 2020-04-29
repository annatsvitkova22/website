import React from 'react';
import * as classnames from 'classnames';

const ArticleDateTime = ({ date, time, className }) => {
  const articleDate = date ? date.split(' ') : null;
  const day = articleDate ? articleDate[0] : null;
  const month = articleDate ? articleDate[1] : null;
  return (
    <div className={classnames('meta-date-group', className)}>
      {day && <p className="meta-date-group__day">{day}</p>}
      {month && <p className="meta-date-group__month">{month}</p>}
      {time && (
        <time dateTime={date} className="meta-date-group__time">
          {time}
        </time>
      )}
    </div>
  );
};

export default ArticleDateTime;
