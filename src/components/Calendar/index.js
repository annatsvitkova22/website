import React from 'react';
import ReactCalendar from 'react-calendar';
import * as classnames from 'classnames';
import * as moment from 'moment';

import Icon from '~/components/Icons';

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
      prevLabel={<Icon icon={'chevron-left'} />}
      nextLabel={<Icon icon={'chevron-right'} />}
      value={currentValue ? new Date(currentValue) : ''}
      tileDisabled={({ activeStartDate, date, view }) => {
        if (view !== 'month') return false;
        const now = moment(activeStartDate);
        return !moment(date).isSame(now, 'month');
      }}
    />
  );
};

export default Calendar;
