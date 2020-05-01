import React from 'react';
import NumberFormat from 'react-number-format';
import * as classnames from 'classnames';

const CrowdfundingProgress = ({ post, className, size = 'small' }) => {
  const {
    cfACF: { tocollect, collected },
  } = post;
  const collectedNumber = collected || 0;
  const percent = (collectedNumber * 100) / tocollect;
  const percentage = `${percent > 100 ? '100' : percent}%`;
  return (
    <div className={classnames('crowdfunding-progress', className)}>
      <div className="crowdfunding-progress__info">
        <div
          className={classnames('crowdfunding-progress__amount', {
            'crowdfunding-progress__amount--big': size === 'big',
          })}
        >
          <NumberFormat
            value={collectedNumber}
            displayType={'text'}
            thousandSeparator={' '}
            suffix="грн"
          />{' '}
          <span>зібрано</span>
        </div>
        <div className="crowdfunding-progress__percentage">{percentage}</div>
      </div>
      <div className="crowdfunding-progress__bar">
        <span style={{ width: percentage }} />
      </div>
    </div>
  );
};

export default CrowdfundingProgress;
