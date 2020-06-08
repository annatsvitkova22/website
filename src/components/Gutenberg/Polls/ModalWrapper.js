import React from 'react';

import Icons from '~/components/Icons';
import ShareItems from '~/components/Share';
import PollResults from '~/components/Gutenberg/Polls/PollResults';

const ModalWrapper = ({ handleClose, data, pollResult }) => {
  return (
    <div className={'comments-pp__wrapper'}>
      <div className={'comments-pp'}>
        <div className={'comments-pp__close'}>
          <button onClick={handleClose} className={'comments-pp__close-btn'}>
            <Icons icon={'close-comment'} />
          </button>
        </div>
        <div className="comments-pp__container">
          <div className={'comments-pp__header'}>
            <span>Результати</span>
            <ShareItems className={'comments-pp__socials-items'} />
          </div>
          <PollResults data={data} results={pollResult} />
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
