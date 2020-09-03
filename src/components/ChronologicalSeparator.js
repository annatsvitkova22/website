import React from 'react';
import * as classnames from 'classnames';
import * as moment from 'moment';
import PropTypes from 'prop-types';

const ChronologicalSeparator = ({ posts, currentIndex, showTime, showForEach, className }) => {
  const currentDate = moment(posts[currentIndex].date);
  const time = moment(posts[currentIndex].date).format('HH:mm');
  let format = 'D MMMM';
  if (!currentDate.isSame(moment(), 'year')) {
    format = 'D MMMM YYYY';
  }
  let text = '';
  if (currentIndex === 0 && !currentDate.isSame(moment(), 'day')) {
    text = currentDate.locale('uk').format(format);
  } else {
    if (currentIndex === 0) return null;
    const prevDate = moment(posts[currentIndex - 1].date);

    if (!showForEach && currentDate.isSame(prevDate, 'day')) return null;
    
    text = currentDate.locale('uk').format(format);
    if (moment().subtract(1, 'days').isSame(currentDate, 'day')) {
      text = 'Вчора';
    }
  }
  const { date } = posts[currentIndex];
  return (
    <h3 className={classnames('date-separator', className)}>
      <time className="date-separator__time" dateTime={date}>
        {text}  {showTime && time}
      </time>
    </h3>
  );
};

ChronologicalSeparator.propTypes = {
  posts: PropTypes.any,
  showTime: PropTypes.bool,
  showForEach: PropTypes.bool,
  currentIndex: PropTypes.any,
  className: PropTypes.string,
};

export default ChronologicalSeparator;
