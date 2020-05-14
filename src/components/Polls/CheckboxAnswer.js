import React from 'react';
import PropTypes from 'prop-types';

function CheckboxAnswer({ id, answerType, answerContent, handleSelectChange }) {
  return (
    <li className="answerOption">
      <input
        type="checkbox"
        className="checkboxCustomButton"
        name="checkbox"
        id={id}
        value={answerType}
        onChange={handleSelectChange}
      />
      <label className="checkboxCustomLabel" htmlFor={answerType}>
        {answerContent}
      </label>
    </li>
  );
}

CheckboxAnswer.propTypes = {
  answerType: PropTypes.any,
  answerContent: PropTypes.string,
  handleSelectChange: PropTypes.func,
};
export default CheckboxAnswer;
