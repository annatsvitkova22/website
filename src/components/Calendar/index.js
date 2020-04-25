import React from 'react';
import ReactCalendar from 'react-calendar';
import * as classnames from 'classnames';
import * as moment from 'moment';

const Calendar = ({
  max = new Date(),
  currentValue,
  onChange = () => {},
  classNames,
}) => {
  return (
    <ReactCalendar
      className={classnames('calendar', classNames)}
      locale="uk"
      maxDate={max}
      onChange={onChange}
      value={currentValue ? new Date(currentValue) : ''}
      tileDisabled={({ activeStartDate, date, view }) => {
        if (view !== 'month') return;
        const now = moment(activeStartDate);
        return !moment(date).isSame(now, 'month');
      }}
    />
  );
};

export default Calendar;
