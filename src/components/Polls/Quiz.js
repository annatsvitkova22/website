import React from 'react';
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
  answerOption: PropTypes.any,
  type: PropTypes.string,
  handleOptionChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  handleAnswerSelected: PropTypes.func,
  handlePollSubmit: PropTypes.func,
  btnCls: PropTypes.object,
};

export default Quiz;
