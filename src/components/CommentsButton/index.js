import React from 'react';
import PropTypes from 'prop-types';

import CommentsPopUp from '~/components/CommentsPopUp';
import Icons from '~/components/Icons';

const CommentsButton = ({ className, comments }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const changeVisibility = () => {
    setIsVisible(() => {
      return !isVisible;
    });
  };

  return (
    <>
      <button className={`comments-button`} onClick={changeVisibility}>
        <Icons icon={'comment'} />
        <span>Коментарі</span>
        {comments && <span>( {comments.pageInfo.total})</span>}
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
