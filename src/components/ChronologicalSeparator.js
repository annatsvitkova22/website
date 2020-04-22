import React from 'react';
import * as moment from 'moment';

const ChronologicalSeparator = ({ posts, currentIndex }) => {
  if (currentIndex === 0) return null;
  const prevDate = moment(posts[currentIndex - 1].date);
  const currentDate = moment(posts[currentIndex].date);
  if (currentDate.isSame(prevDate, 'day')) return null;
  let text = currentDate.locale('uk').format('D MMMM');
  if (moment().subtract(1, 'days').isSame(currentDate, 'day')) {
    text = 'Вчора';
  }
  const date = posts[currentIndex].date;
  return <time dateTime={date}>{text}</time>;
};

export default ChronologicalSeparator;
