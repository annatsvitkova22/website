import React from 'react';
import PropTypes from 'prop-types';

import CommentsPopUp from '~/components/CommentsPopUp';

const CommentsButton = ({ className, comments }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const changeVisibility = () => {
    setIsVisible(() => {
      return !isVisible;
    });
  };

  return (
    <>
      <button className={className} onClick={changeVisibility}>
        Comments {comments && comments.pageInfo.total}
      </button>
      <CommentsPopUp isVisible={isVisible} />
    </>
  );
};

CommentsButton.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.any,
};

export default CommentsButton;
