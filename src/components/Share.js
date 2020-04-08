import React from 'react';

import SharePopUp from '~/components/SharePopUp';
import Icons from '~/components/Icons';

const Share = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const changeVisibility = () => {
    setIsVisible(() => {
      return !isVisible;
    });
  };

  return (
    <div className={'share'}>
      <button onClick={changeVisibility} className={'share-button'}>
        <Icons icon={'share'} />
      </button>
      <SharePopUp isVisible={isVisible} />
      <span className={'like'}>!</span>
    </div>
  );
};

export default Share;
