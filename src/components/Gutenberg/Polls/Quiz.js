import React from 'react';
import PropTypes from 'prop-types';

import RadioAnswer from './RadioAnswer';

import CheckboxAnswer from '~/components/Gutenberg/Polls/CheckboxAnswer';

const Quiz = (props) => {
  const {
    question,
    answerOptions,
    type,
    handleOptionChange,
    handleSelectChange,
    handleAnswerSelected,
    handlePollSubmit,
    btnCls,
  } = props;
  return (
    <div className="poll__question">
      <h3 className="poll__question-title">{question}</h3>
      <form>
        <ul className="poll__answers">
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
            return null;
          })}
        </ul>
        <div className="poll__buttons">
          <button onClick={handleAnswerSelected} className={`${btnCls.nxtBtn}`}>
            наступне питання
          </button>
          <button className={`${btnCls.sbmBtn}`} onClick={handlePollSubmit}>
            завершити
          </button>
        </div>
      </form>
    </div>
  );
};

Quiz.propTypes = {
  question: PropTypes.any,
  answerOptions: PropTypes.any,
  type: PropTypes.any,
  handleOptionChange: PropTypes.any,
  handleSelectChange: PropTypes.any,
  handleAnswerSelected: PropTypes.any,
  handlePollSubmit: PropTypes.any,
  btnCls: PropTypes.any,
};

export default Quiz;
