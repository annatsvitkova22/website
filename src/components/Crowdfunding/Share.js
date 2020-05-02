import React, { useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';

import Icons from '~/components/Icons';
import Share from '~/components/Share';

const { publicRuntimeConfig } = getConfig();

const { frontUrl } = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const CrowdfundingShare = ({ onClose = () => {} }) => {
  const { asPath } = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const input = document.querySelector('.crowdfunding-share__link');
    input.select();
    document.execCommand('copy');

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="crowdfunding-share">
      <div className="crowdfunding-share__wrapper">
        <div className="crowdfunding-share__title">
          <span>поширити</span>
          <button className="crowdfunding-share__close" onClick={onClose}>
            <Icons icon={'close-comment'} />
          </button>
        </div>
        <Share className="crowdfunding-share__socials" />
        <div className="crowdfunding-share__share">
          <input
            className="crowdfunding-share__link"
            value={`${frontUrl}${asPath}`}
            disabled
          />
          <button disabled={copied} className="zm-button" onClick={handleCopy}>
            {!copied && 'Копіювати'}
            {copied && 'Скопійовано!'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrowdfundingShare;
