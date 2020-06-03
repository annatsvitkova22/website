import React from 'react';
import PropTypes from 'prop-types';

function RadioAnswer({ answerType, handleOptionChange, answerContent }) {
  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        id={answerType}
        value={answerType}
        onChange={handleOptionChange}
      />
      <label className="radioCustomLabel" htmlFor={answerType}>
        {answerContent}
      </label>
    </li>
  );
}

RadioAnswer.propTypes = {
  answerType: PropTypes.any,
  answerContent: PropTypes.string,
  handleOptionChange: PropTypes.func,
};
export default RadioAnswer;
