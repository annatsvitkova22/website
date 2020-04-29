import React, { useState } from 'react';
import * as classnames from 'classnames';

import CrowdfundingDonation from '~/components/Crowdfunding/Donation';
import Share from '~/components/Crowdfunding/Share';

const CrowdfundingActions = ({ className, post }) => {
  const [donationOpen, setDonationOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(true);

  return (
    <>
      <ul className={classnames('crowdfunding-actions', className)}>
        <li className="crowdfunding-actions__item">
          <button
            onClick={() => setDonationOpen(true)}
            className="crowdfunding-actions__support"
          >
            підтримати
          </button>
        </li>
        <li className="crowdfunding-actions__item">
          <button
            className="crowdfunding-actions__share"
            onClick={() => setShareOpen(true)}
          >
            поширити
          </button>
        </li>
      </ul>
      {donationOpen && (
        <CrowdfundingDonation
          post={post}
          onClose={() => setDonationOpen(false)}
        />
      )}
      {shareOpen && <Share post={post} onClose={() => setShareOpen(false)} />}
    </>
  );
};

export default CrowdfundingActions;
