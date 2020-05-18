import React from 'react';
import * as classnames from 'classnames';
import * as moment from 'moment';
import PropTypes from 'prop-types';

const ArticleDate = ({ date, className, format = 'HH:mm' }) => {
  const time = moment(date).locale('uk').format(format);
  return (
    <time className={classnames('meta-date', className)} dateTime={date}>
      {time}
    </time>
  );
};

ArticleDate.propTypes = {
  date: PropTypes.any,
  className: PropTypes.string,
  format: PropTypes.string,
};

export default ArticleDate;
