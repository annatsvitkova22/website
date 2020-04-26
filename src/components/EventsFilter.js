import React from 'react';
import PropTypes from 'prop-types';

const EventsFilter = (props) => {
  const { eventFilter } = props;
  return (
    <div>
      <button onClick={eventFilter} name="actual">
        Заплановані
      </button>
      <button onClick={eventFilter} name="finished">
        Завершені
      </button>
       <input type="date" onChange={eventFilter} name="forDate" />
    </div>
  );
};

EventsFilter.propTypes = {
  eventFilter: PropTypes.any,
};

export default EventsFilter;
