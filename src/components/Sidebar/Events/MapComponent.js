import React from 'react';

import Icons from '~/components/Icons';

export const MapComponent = ({ data, type }) => {
  return (
    <>
      {data &&
        data.map((item, index) => {
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

export const MapIcons = ({ data, className = '' }) => {
  console.log('incomung', data);
  return (
    <>
      {data &&
        data.map((item, index) => {
          if (item.url) {
            return (
              <a
                href={item.url}
                target={'__blank'}
                key={index}
                className={className}
              >
                <Icons icon={item.name} />
              </a>
            );
          }
          return (
            <a
              href={item.socialUrl}
              target={'__blank'}
              key={index}
              className={className}
            >
              <Icons icon={item.icon} />
            </a>
          );
        })}
    </>
  );
};
