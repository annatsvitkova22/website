import React from 'react';
import * as classnames from 'classnames';

const CrowdfundingSupported = ({ className, post }) => {
  return (
    <ul className={classnames('crowdfunding-supported', className)}>
      <li className="crowdfunding-supported__item">some user</li>
    </ul>
  );
};

export default CrowdfundingSupported;
