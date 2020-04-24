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
    !isVisible
      ? document.querySelector('body').classList.add('isB-MenuOpen')
      : document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  const handleClose = () => {
    setIsVisible(false);
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  return (
    <>
      <button className={`comments-button`} onClick={changeVisibility}>
        <Icons icon={'comment'} />
        <span>Коментарі</span>
        {comments && <span>( {comments.pageInfo.total})</span>}
      </button>
      <CommentsPopUp isVisible={isVisible} handleClose={handleClose} />
    </>
  );
};

CommentsButton.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.any,
};

export default CommentsButton;
