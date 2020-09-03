import React, { useState, useEffect } from 'react';
import * as classnames from 'classnames';

import CrowdfundingDonation from '~/components/Crowdfunding/Donation';
import CrowdfundingShare from '~/components/Crowdfunding/Share';

const CrowdfundingActions = ({ className, post, postId }) => {
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

  useEffect(() => {
    return () => {
      document.querySelector('body').classList.remove('isB-MenuOpen');
    };
  }, []);

  return (
    <>
      <ul className={classnames('crowdfunding-actions', className)}>
        <li className="crowdfunding-actions__item" onClick={handleDonationOpen}>
          <button className="crowdfunding-actions__support">підтримати</button>
        </li>
        <li className="crowdfunding-actions__item" onClick={handleShareOpen}>
          <button className="crowdfunding-actions__share">поширити</button>
        </li>
      </ul>
      {donationOpen && (
        <CrowdfundingDonation
          post={post}
          onClose={handleClose}
          postId={postId}
        />
      )}
      {shareOpen && (
        <CrowdfundingShare post={post} onClose={handleClose} postId={postId} />
      )}
    </>
  );
};

export default CrowdfundingActions;
