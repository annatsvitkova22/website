import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';
import axios from 'axios';
import getConfig from 'next/config';
import * as _ from 'lodash';
import classNames from 'classnames';

import Quiz from './Quiz';

import { AuthStore } from '~/stores/Auth';
import PollProgress from '~/components/Polls/PollProgress';
import ModalWrapper from '~/components/Polls/ModalWrapper';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const Polls = ({ data, formId }) => {
  const authStateLink = useStateLink(AuthStore);
  const authStore = authStateLink.get();

  const { apiUrl } = config;

  const [questionCount, setQuestionCount] = useState(0);
  const [question, setQuestion] = useState(data[questionCount]);
  const [answer, setAnswer] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [pollResults, setPollResults] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [allAnswers, setAllAnswers] = useState(false);
  const [completePoll, setCompletePoll] = useState(false);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);

  const prevBtn = classNames({
    'p-btn': true,
    'prev-btn--active': questionCount > 0,
  });
  const nxtBtn = classNames({
    'p-btn': true,
    'nxt-btn--active': questionCount >= 0 && questionCount < data.length - 1,
  });
  const sbmBtn = classNames({
    'p-btn': true,
    'sbt-btn--active': questionCount === data.length - 1,
  });
  const btnCls = { prevBtn, nxtBtn, sbmBtn };

  const handlePollSubmit = (event) => {
    event.preventDefault();
    if (question.inputType === 'radio') {
      setAnswer({ [question.id]: selectedOption, ...answer });
    }
    if (question.inputType === 'checkbox') {
      setAnswer({ ...answer, ...checkedItems });
    }
    setAllAnswers(true);
    setCompletePoll(true);
  };

  const handleOpenModal = () => {
    setResultsModalOpen(true);
    document.querySelector('body').classList.add('isB-MenuOpen');
  };
  const handleCloseModal = () => {
    setResultsModalOpen(false);
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  const handleAnswerSelected = (event) => {
    event.preventDefault();

    if (questionCount < data.length - 1) setQuestionCount(questionCount + 1);

    if (question.inputType === 'radio') {
      setAnswer({ [question.id]: selectedOption, ...answer });
    }
    if (question.inputType === 'checkbox') {
      setAnswer({ ...answer, ...checkedItems });
    }
  };

  const handleOptionChange = (event) => {
    if (event.target.checked) {
      setSelectedOption(event.target.value);
    }
  };

  const handleSelectChange = (event) => {
    if (`${question.id}.${event.target.id}` in checkedItems) {
      setCheckedItems(
        _.omit(checkedItems, `${question.id}.${event.target.id}`)
      );
    } else {
      setCheckedItems({
        ...checkedItems,
        [`${question.id}.${event.target.id}`]: event.target.value,
      });
    }
  };

  useEffect(() => {
    async function postData() {
      const conf = {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      };
      await axios
        .post(
          `${apiUrl}/wp-json/gf/v2/entries`,
          { form_id: formId, ...answer },
          conf
        )
        .then(async (response) => {
          const pollResponse = await axios.get(
            `${apiUrl}/wp-json/zmrest/gf-entries?id=${formId}`,
            conf
          );
          setPollResults(pollResponse.data);
        });
    }
    if (allAnswers) {
      postData();
    }
  }, [allAnswers]);

  useEffect(() => {
    setQuestion(data[questionCount]);
  }, [questionCount]);

  const percentage = ((questionCount + 1) / data.length) * 100;
  return (
    <div className="poll">
      <PollProgress
        questionCount={questionCount}
        percentage={percentage}
        length={data.length}
        pollResult={completePoll}
      />
      {!completePoll && (
        <Quiz
          answerOptions={question.choices}
          question={question.label}
          questionTotal={data.length}
          type={question.inputType}
          handleOptionChange={handleOptionChange}
          handleSelectChange={handleSelectChange}
          handleAnswerSelected={handleAnswerSelected}
          handlePollSubmit={handlePollSubmit}
          btnCls={btnCls}
        />
      )}
      {completePoll && (
        <>
          <h3 className="poll__question-title">Результат</h3>
          <p className="poll__answers-thx">
            Дякуємо за проходження опитування!
          </p>
          <button className={`${btnCls.sbmBtn}`} onClick={handleOpenModal}>
            Переглянути Результати
          </button>
          {resultsModalOpen && (
            <ModalWrapper
              handleClose={handleCloseModal}
              data={data}
              pollResult={pollResults}
            />
          )}
        </>
      )}
    </div>
  );
};

Polls.propTypes = {
  data: PropTypes.any,
  formId: PropTypes.any,
};

export default Polls;
