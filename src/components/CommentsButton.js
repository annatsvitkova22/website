import React from 'react';
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

export default CommentsButton;
