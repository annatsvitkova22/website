import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Quiz from './Quiz';

const Polls = ({ data }) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [state, setState] = useState(data);
  const [question, setQuestion] = useState(state[questionCount]);
  const [answer, setAnswer] = useState([]);

  const handleAnswerSelected = (event) => {
    setQuestionCount(questionCount + 1);

    setAnswer([...answer, event.currentTarget.value]);
  };

  useEffect(() => {
    setQuestion(state[questionCount]);
  }, [questionCount]);

  return (
    <div>
      <div>
        {questionCount + 1} / {state.length}
      </div>
      <Quiz
        answerOptions={question.choices}
        question={question.label}
        questionTotal={state.length}
        onAnswerSelected={handleAnswerSelected}
        type={question.inputType}
      />
    </div>
  );

  /*  return (
    <div>
      <Quiz
        answer={{ }}
        answerOptions={['first', 'second', 'third']}
        question={state.label}
        questionTotal={1}
        onAnswerSelected={handleAnswerSelected}
      />
    </div>
  );
 */
};

Polls.propTypes = {
  data: PropTypes.object,
};

export default Polls;
