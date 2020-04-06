import React from 'react';
import PropTypes from 'prop-types';

const Calendar = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.renderedContent }} />;
};

Calendar.propTypes = {
  block: PropTypes.any,
};

export default Calendar;
