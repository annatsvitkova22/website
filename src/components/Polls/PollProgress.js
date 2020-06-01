import React from 'react';
import PropTypes from 'prop-types';

const PollProgress = ({ percentage, questionCount, length, pollResult }) => {
  const count = `${questionCount + 1} з ${length}`;
  const countLast = 'Готово';
  return (
    <div className="poll__progress">
      <span className="poll__progress-count">
        {pollResult ? countLast : count}
      </span>
      <div className="crowdfunding-progress__bar">
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

PollProgress.propTypes = {
  percentage: PropTypes.any,
  questionCount: PropTypes.any,
  length: PropTypes.any,
  pollResults: PropTypes.any,
};

export default PollProgress;
