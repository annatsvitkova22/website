import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
  if (props.type === 'radio') {
    return (
      <li className="answerOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          id={props.answerType}
          value={props.answerType}
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </li>
    );
  }
  if (props.type === 'checkbox') {
    return (
      <li className="answerOption">
        <input
          type="checkbox"
          className="radioCustomButton"
          name="radioGroup"
          id={props.answerType}
          value={props.answerType}
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </li>
    );
  }
}

export default AnswerOption;
