import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RadioAnswer from './RadioAnswer';

import CheckboxAnswer from '~/components/Polls/CheckboxAnswer';

const Quiz = (props) => {
  const {
    question,
    answerOptions,
    type,
    handleOptionChange,
    handleSelectChange,
    handleAnswerSelected,
  } = props;
  return (
    <div>
      <h2 className="question">{question}</h2>
      <form>
        <ul className="answerOptions">
          {answerOptions.map((answer, index) => {
            if (type === 'radio') {
              return (
                <RadioAnswer
                  key={answer.value}
                  answerContent={answer.text}
                  answerType={answer.value}
                  type={type}
                  handleOptionChange={handleOptionChange}
                />
              );
            }
            if (type === 'checkbox') {
              return (
                <CheckboxAnswer
                  key={answer.value}
                  answerContent={answer.text}
                  answerType={answer.value}
                  handleSelectChange={handleSelectChange}
                  id={index + 1}
                />
              );
            }
          })}
        </ul>
        <button onClick={handleAnswerSelected}>Next</button>
      </form>
    </div>
  );
};

export default Quiz;
