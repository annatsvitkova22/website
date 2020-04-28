import React from 'react';
import * as classnames from 'classnames';

const CrowdfundingActions = ({ className, post }) => {
  return (
    <ul className={classnames('crowdfunding-actions', className)}>
      <li className="crowdfunding-actions__item">
        <button>підтримати</button>
      </li>
      <li className="crowdfunding-actions__item">
        <button>поширити</button>
      </li>
    </ul>
  );
};

export default CrowdfundingActions;
