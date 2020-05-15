import React, { useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useStateLink } from '@hookstate/core';
import * as axios from 'axios';

import Icons from '~/components/Icons';
import Share from '~/components/Share';
import { AuthStore } from '~/stores/Auth';
import { updateShares } from '~/stores/SingleArticle';

const { publicRuntimeConfig } = getConfig();

const { frontUrl, apiUrl } = publicRuntimeConfig.find(
  (e) => e.env === process.env.ENV
);

// TODO: refactor to be universal
// combine with components/Share/Modal
const CrowdfundingShare = ({ post, onClose = () => {}, color = 'black' }) => {
  const authStateLink = useStateLink(AuthStore);

  let type = `${post.__typename.toLowerCase()}`;
  const id = post[`${type}Id`];
  type = `${type}s`;
  if (type === 'opportunitys') {
    type = 'opportunities';
  }

  const { asPath } = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const input = document.querySelector('.crowdfunding-share__link');
    input.select();
    document.execCommand('copy');

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);

    await updateShared();
  };

  const updateShared = async () => {
    const { token } = authStateLink.get();

    const conf = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const currentShares = await axios.get(
      `${apiUrl}/wp-json/acf/v3/${type}/${id}/shared`,
      conf
    );
    const updatedShares = await axios.post(
      `${apiUrl}/wp-json/acf/v3/${type}/${id}/shared`,
      {
        fields: {
          shared: currentShares.data.shared
            ? parseInt(currentShares.data.shared) + 1
            : 1,
        },
      },
      conf
    );
    updateShares(updatedShares.data.shared);
  };

  return (
    <div className="crowdfunding-share">
      <div className="crowdfunding-share__wrapper">
        <div className="crowdfunding-share__title">
          <span>поширити</span>
          <button className="crowdfunding-share__close" onClick={onClose}>
            <Icons color={color} icon={'close-comment'} />
          </button>
        </div>
        <Share
          onShared={updateShared}
          className="crowdfunding-share__socials"
          color={color}
        />
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
