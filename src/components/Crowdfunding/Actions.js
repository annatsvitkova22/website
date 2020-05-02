import React, { useState } from 'react';
import * as classnames from 'classnames';

import CrowdfundingDonation from '~/components/Crowdfunding/Donation';
import Share from '~/components/Crowdfunding/Share';

const CrowdfundingActions = ({ className, post }) => {
  const [donationOpen, setDonationOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleDonationOpen = () => {
    setDonationOpen(true);
    document.querySelector('body').classList.add('isB-MenuOpen');
  };
  const handleShareOpen = () => {
    setShareOpen(true);
    document.querySelector('body').classList.add('isB-MenuOpen');
  };
  const handleClose = () => {
    setDonationOpen(false);
    setShareOpen(false);
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  return (
    <>
      <ul className={classnames('crowdfunding-actions', className)}>
        <li className="crowdfunding-actions__item">
          <button
            onClick={handleDonationOpen}
            className="crowdfunding-actions__support"
          >
            підтримати
          </button>
        </li>
        <li className="crowdfunding-actions__item">
          <button
            className="crowdfunding-actions__share"
            onClick={handleShareOpen}
          >
            поширити
          </button>
        </li>
      </ul>
      {donationOpen && (
        <CrowdfundingDonation post={post} onClose={handleClose} />
      )}
      {shareOpen && <Share post={post} onClose={handleClose} />}
    </>
  );
};

export default CrowdfundingActions;
