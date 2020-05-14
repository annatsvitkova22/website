import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStateLink } from '@hookstate/core';
import axios from 'axios';
import getConfig from 'next/config';
import * as _ from 'lodash';

import Quiz from './Quiz';

import { AuthStore } from '~/stores/Auth';

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

  const handlePollSubmit = async () => {
    const conf = {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    };
    await axios.post(
      `${apiUrl}/wp-json/gf/v2/entries`,
      { form_id: formId, ...answer },
      conf
    );

    const pollResponse = await axios.get(
      `${apiUrl}/wp-json/gf/v2/forms/${formId}/entries`,
      conf
    );
    setPollResults(pollResponse.data.entries);
  };

  const handleAnswerSelected = (event) => {
    event.preventDefault();

    setQuestionCount(questionCount + 1);

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
    setQuestion(data[questionCount]);
  }, [questionCount]);

  return (
    <div>
      <div>
        {questionCount + 1} / {data.length}
      </div>
      <Quiz
        answerOptions={question.choices}
        question={question.label}
        questionTotal={data.length}
        type={question.inputType}
        handleOptionChange={handleOptionChange}
        handleSelectChange={handleSelectChange}
        handleAnswerSelected={handleAnswerSelected}
      />
      <button onClick={handlePollSubmit}>submit</button>
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
