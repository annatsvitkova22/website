import React from 'react';
import * as moment from 'moment';

const ChronologicalSeparator = ({ posts, currentIndex }) => {
  const currentDate = moment(posts[currentIndex].date);
  let text = '';
  if (currentIndex === 0 && !currentDate.isSame(moment(), 'day')) {
    text = currentDate.locale('uk').format('D MMMM');
  } else {
    if (currentIndex === 0) return null;
    const prevDate = moment(posts[currentIndex - 1].date);
    if (currentDate.isSame(prevDate, 'day')) return null;
    text = currentDate.locale('uk').format('D MMMM');
    if (moment().subtract(1, 'days').isSame(currentDate, 'day')) {
      text = 'Вчора';
    }
  }
  const { date } = posts[currentIndex];
  return (
    <time className={'article__date'} dateTime={date}>
      {text}
    </time>
  );
};

export default ChronologicalSeparator;
