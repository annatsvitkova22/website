import React from 'react';
import PropTypes from 'prop-types';

const CommentsPopUp = ({ isVisible }) => {
  return <>{isVisible && <div>123</div>}</>;
};

CommentsPopUp.propTypes = {
  isVisible: PropTypes.bool,
};

export default CommentsPopUp;
