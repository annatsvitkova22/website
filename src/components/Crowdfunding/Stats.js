import React from 'react';
import * as classnames from 'classnames';
import * as moment from 'moment';

import getCFStatus from '~/lib/getCFStatus';

const CrowdfundingStats = ({ className, post }) => {
  const {
    cfACF: { supported, expiration, shared },
  } = post;

  moment.locale('uk');

  const remaining = {
    type: 'days',
    value: '',
  };

  const expiry = moment(expiration);
  const now = moment();

  remaining.value = expiry.diff(now, 'days');
  if (remaining.value === 0) {
    remaining.value = expiry.diff(now, 'hours');
    remaining.type = 'hours';
    if (remaining.value === 0) {
      remaining.value = expiry.diff(now, 'minutes');
      remaining.type = 'minutes';
    }
  }

  const status = getCFStatus(post);

  return (
    <ul className={classnames('crowdfunding-stats', className)}>
      <li className="crowdfunding-stats__item">
        <div className="crowdfunding-stats__title">Підтримали</div>
        <div className="crowdfunding-stats__value">
          {supported ? supported.length : 0}
        </div>
      </li>
      <li className="crowdfunding-stats__item">
        <div className="crowdfunding-stats__title">Поширили</div>
        <div className="crowdfunding-stats__value">{shared || 0}</div>
      </li>
      {(status.value === 'active' || status.value === 'finished') && (
        <li className="crowdfunding-stats__item">
          <div className="crowdfunding-stats__title">Залишилося</div>
          <div className="crowdfunding-stats__value">
            {remaining.value === 1 ? `1 ` : ''}
            {moment.duration(remaining.value, remaining.type).humanize()}
          </div>
        </li>
      )}
    </ul>
  );
};

export default CrowdfundingStats;
