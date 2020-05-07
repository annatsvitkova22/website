import React from 'react';
import PropTypes from 'prop-types';

const Calendar = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.renderedContent }}
      className={className}
    />
  );
};

Calendar.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Calendar;
