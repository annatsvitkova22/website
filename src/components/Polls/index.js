import React, { useEffect, useState } from 'react';
import Poll from 'react-polls';
import PropTypes from 'prop-types';

const Polls = ({ data }) => {
  const [state, setState] = useState(data);
  console.log(state);

  const handleVote = () => {
    alert('Vote');
  };

  useEffect(() => {
    const newPoll = data.choices.map((obj, index) => {
      obj.option = obj.text;
      delete obj.text;
      return obj;
    });

    setState({
      ...state,
      choices: newPoll,
    });
  }, [data]);

  return (
    <div>
      <Poll
        question={state.label}
        answers={state.choices}
        noStorage={true}
        onVote={handleVote}
      />
    </div>
  );
};

Polls.propTypes = {
  data: PropTypes.object,
};

export default Polls;
