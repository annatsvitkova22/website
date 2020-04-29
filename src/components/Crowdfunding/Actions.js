import React, { useState } from 'react';
import * as classnames from 'classnames';
import CrowdfundingDonation from '~/components/Crowdfunding/Donation';

const CrowdfundingActions = ({ className, post }) => {
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <>
      <ul className={classnames('crowdfunding-actions', className)}>
        <li className="crowdfunding-actions__item">
          <button onClick={() => setDonationOpen(true)}>підтримати</button>
        </li>
        <li className="crowdfunding-actions__item">
          <button>поширити</button>
        </li>
      </ul>
      {donationOpen && (
        <CrowdfundingDonation
          post={post}
          onClose={() => setDonationOpen(false)}
        />
      )}
    </>
  );
};

export default CrowdfundingActions;
