import React, { useState } from 'react';

import Icons from '~/components/Icons';

const CrowdfundingShare = ({ post, onClose = () => {} }) => {
  return (
    <div className="crowdfunding-share">
      <div className="crowdfunding-share__wrapper">
        <div className="crowdfunding-share__title">
          <span>поширити</span>
          <button className="crowdfunding-share__close" onClick={onClose}>
            <Icons icon={'close-comment'} />
          </button>
        </div>
        <div className="crowdfunding-share__socials">
          <div className="crowdfunding-share__item crowdfunding-share__facebook">
            <a href="https://facebook.com">
              <Icons icon={'facebook'} />
              <span>Facebook</span>
            </a>
          </div>
          <div className="crowdfunding-share__item crowdfunding-share__instagram">
            <a href="https://telegram.com">
              <Icons icon={'telegram'} />
              <span>Telegram</span>
            </a>
          </div>
          <div className="crowdfunding-share__item crowdfunding-share__mail">
            <a href="#">
              <Icons icon={'email'} />
              <span>Пошта</span>
            </a>
          </div>
        </div>
        <form className="crowdfunding-share__share">
          <input
            className="crowdfunding-share__link"
            value={'https://zmist.pl.ua/fsadsadk'}
            disabled
          />
          <button className="crowdfunding-share__copy">Копіювати</button>
        </form>
      </div>
    </div>
  );
};

export default CrowdfundingShare;
