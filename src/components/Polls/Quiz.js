import React from 'react';
import PropTypes from 'prop-types';

import AnswerOption from './AnswerOption';

function Quiz({
  question,
  answerOptions,
  questionTotal,
  onAnswerSelected,
  type,
}) {
  return (
    <div>
      <h2 className="question">{question}</h2>
      <ul className="answerOptions">
        {answerOptions.map((answer, index) => {
          return (
            <AnswerOption
              key={answer.value}
              answerContent={answer.text}
              onAnswerSelected={onAnswerSelected}
              answerType={answer.value}
              type={type}
            />
          );
        })}
      </ul>
      <button onClick={onAnswerSelected}>Submit</button>
    </div>
  );
}

export default Quiz;
