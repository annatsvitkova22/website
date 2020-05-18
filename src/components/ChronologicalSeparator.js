import React from 'react';
import * as classnames from 'classnames';
import * as moment from 'moment';
import PropTypes from 'prop-types';

const ChronologicalSeparator = ({ posts, currentIndex, className }) => {
  const currentDate = moment(posts[currentIndex].date);
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
    if (currentDate.isSame(prevDate, 'day')) return null;
    text = currentDate.locale('uk').format(format);
    if (moment().subtract(1, 'days').isSame(currentDate, 'day')) {
      text = 'Вчора';
    }
  }
  const { date } = posts[currentIndex];
  return (
    <h4 className={classnames('date-separator', className)}>
      <time className="date-separator__time" dateTime={date}>
        {text}
      </time>
    </h4>
  );
};

ChronologicalSeparator.propTypes = {
  posts: PropTypes.object,
  currentIndex: PropTypes.any,
  className: PropTypes.string,
};

export default ChronologicalSeparator;
