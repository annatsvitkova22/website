import React from 'react';
import * as classnames from 'classnames';
import * as moment from 'moment';

const ArticleDate = ({ date, className }) => {
  const time = moment(date).format('HH:mm');
  return (
    <time className={classnames('meta-date', className)} dateTime={date}>
      {time}
    </time>
  );
};

export default ArticleDate;
