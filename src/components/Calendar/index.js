import React from 'react';
import ReactCalendar from 'react-calendar';
import * as classnames from 'classnames';
import * as moment from 'moment';

import './styles.scss';

const Calendar = ({
  max = new Date(),
  currentValue = new Date(),
  onChange = () => {},
  classNames,
}) => {
  return (
    <ReactCalendar
      className={classnames('calendar', classNames)}
      locale="uk"
      maxDate={max}
      onChange={onChange}
      value={currentValue}
      tileDisabled={({ activeStartDate, date, view }) => {
        if (view !== 'month') return;
        const now = moment(activeStartDate);
        // console.log(now.format(), moment(date).format());
        return !moment(date).isSame(now, 'month');
      }}
    />
  );
};

export default Calendar;
