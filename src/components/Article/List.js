import React from 'react';
import * as classnames from 'classnames';

import NavLink from '~/components/SiteLink';
import Icons from '~/components/Icons';

const ArticleList = ({ info, className }) => {
  const { streetName, latitude, longitude } = info.eventAddress;
  const mapLink = `https://www.google.com/maps/@${latitude},${longitude}z`;
  return (
    <ul className={classnames('article-list list-reset', className)}>
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

      {info.eventDays && (
        <li className="article-list__item">
          <Icons
            icon={'calendar'}
            target="_blank"
            className="article-list__item-icon article-list__item-icon--callendar"
          />
          {info.eventDays.map((day, i) => (
            <span key={i} className="article-list__item-days">
              {day.day}
              {info.eventDays.length !== i + 1 && ','}
            </span>
          ))}
        </li>
      )}

      {info.eventTime && (
        <li className="article-list__item">
          <Icons
            icon={'clock'}
            className="article-list__item-icon article-list__item-icon--clock"
          />
          {info.eventTime}
        </li>
      )}
    </ul>
  );
};

export default ArticleList;
