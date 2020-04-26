import React from 'react';
import * as classnames from 'classnames';

import NavLink from '~/components/SiteLink';
import Icons from '~/components/Icons';

const ArticleList = ({ post, className }) => {
  const { streetName, latitude, longitude } = post.zmAfishaACF.eventAddress;
  const mapLink = `https://www.google.com/maps/@${latitude},${longitude}z`;
  return (
    <ul className={classnames('article-list', className)}>
      {streetName && (
        <li className="article-list__item">
          <Icons
            icon={'location'}
            className="article-list__item-icon article-list__item-icon--location"
          />
          <NavLink
            href={mapLink}
            target="_blank"
            className="article-list__item-link"
          >
            {streetName}
          </NavLink>
        </li>
      )}

      {post.zmAfishaACF.eventDays && (
        <li className="article-list__item">
          <Icons
            icon={'calendar'}
            target="_blank"
            className="article-list__item-icon article-list__item-icon--callendar"
          />
          {post.zmAfishaACF.eventDays.map((day, i) => (
            <span key={i} className="article-list__item-days">
              {day.day}
              {post.zmAfishaACF.eventDays.length !== i + 1 && ','}
            </span>
          ))}
        </li>
      )}

      {post.zmAfishaACF.eventTime && (
        <li className="article-list__item">
          <Icons
            icon={'clock'}
            className="article-list__item-icon article-list__item-icon--clock"
          />
          {post.zmAfishaACF.eventTime}
        </li>
      )}
    </ul>
  );
};

export default ArticleList;
