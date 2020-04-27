import React from 'react';

import Icons from '~/components/Icons';

export const MapComponent = ({ data, type }) => {
  return (
    <>
      {data.map((item, index) => {
        if (type === 'phone') {
          return (
            <span className="info-card__item" key={index}>
              {item.phoneNumber}
            </span>
          );
        }
        if (type === 'name') {
          return (
            <span className="info-card__item" key={index}>
              {item.person}
            </span>
          );
        }
        if (type === 'email') {
          return (
            <span className="info-card__item" key={index}>
              {item.email}
            </span>
          );
        }
        return null;
      })}
    </>
  );
};

export const MapIcons = ({ data }) => {

  return (
    <>
      {data.map((item, index) => {
        return (
          <a href={item.socialUrl}>
            <Icons icon={item.icon} />
          </a>
        );
      })}
    </>
  );
};
