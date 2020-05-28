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
            <h3 className="p-results__question">{question.label}</h3>
            {question.choices.map((answer, ind) => {
              return (
                <>
                  <div className="p-results__wrapper">
                    <p key={ind} className="p-results__answer">
                      {answer.text}
                    </p>
                    {pollResulsts && (
                      <span className="p-results__result">
                        {`${Math.floor(
                          (pollResulsts.filter((item) => item === answer.value)
                            .length *
                            100) /
                            results.length
                        )} %`}
                      </span>
                    )}
                  </div>
                  {pollResulsts && (
                    <div className="crowdfunding-progress__bar">
                      <span
                        style={{
                          width: `${
                            (pollResulsts.filter(
                              (item) => item === answer.value
                            ).length *
                              100) /
                            results.length
                          }%`,
                        }}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

PollResults.propTypes = {
  data: PropTypes.any,
  result: PropTypes.any,
};

export default PollResults;
