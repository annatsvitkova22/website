import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

const PollResults = ({ data, results }) => {
  const [pollResulsts, setPollResults] = useState(null);

  useEffect(() => {
    if (results) {
      const pollRes = [];
      data.forEach((question) => {
        return question.choices.forEach((answer) => {
          console.log(answer.value);
          const resultsObj = results.map((obj) => {
            return Object.values(obj).filter((item) => item === answer.value);
          });
          const flattenResult = _.flattenDeep(resultsObj);
          pollRes.push(flattenResult);
        });
      });
      setPollResults(_.flattenDeep([pollRes]));
    }
  }, [results]);

  return (
    <div className="p-results">
      {data.map((question, i) => {
        return (
          <div className="p-results__item" key={i}>
            <h3>{question.label}</h3>
            {question.choices.map((answer, ind) => {
              return (
                <div>
                  <p key={ind}>{answer.text}</p>
                  {pollResulsts && (
                    <span>
                      {
                        pollResulsts.filter((item) => item === answer.value)
                          .length
                      }
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

PollResults.propTypes = {
  data: PropTypes.object,
};

export default PollResults;
