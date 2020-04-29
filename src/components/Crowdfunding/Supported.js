import React from 'react';
import * as classnames from 'classnames';

const CrowdfundingSupported = ({ className, post }) => {
  const {
    cfACF: { supported },
  } = post;
  if (!supported) return null;

  return (
    <ul className={classnames('crowdfunding-supported', className)}>
      {supported.map(({ name, photo, date }) => {
        // TODO: put anon image instead of '' here
        const image = photo && photo.mediaItemUrl ? photo.mediaItemUrl : '';
        return (
          <li className="crowdfunding-supported__item">
            <img
              src={image}
              alt={name}
              className="crowdfunding-supported__photo"
            />
            <div className="crowdfunding-supported__info">
              <div className="crowdfunding-supported__name">{name}</div>
              <div className="crowdfunding-supported__date">{date}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CrowdfundingSupported;
