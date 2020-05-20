import React from 'react';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';

export const MapComponent = ({ data, type }) => {
  return (
    <>
      {data &&
        data.map((item, index) => {
          if (type === 'phone' && item.phoneNumber) {
            return (
              <div className="info-card__contact">
                <span className="info-card__description info-card__phone">
                  Телефон
                </span>
                <span className="info-card__item" key={index}>
                  <a href={`tel:${item.phoneNumber}`}>
                    {item.phoneNumberDisplay}
                  </a>
                </span>
              </div>
            );
          }
          if (type === 'name' && item.person) {
            return (
              <div className="info-card__contact">
                <span className="info-card__description info-card__person">
                  Контактна особа
                </span>
                <span className="info-card__item" key={index}>
                  {item.person}
                </span>
              </div>
            );
          }
          if (type === 'email' && item.email) {
            return (
              <div className="info-card__contact">
                <span className="info-card__description info-card__email">
                  email
                </span>
                <span className="info-card__item" key={index}>
                  <a href={`mailto:${item.email}`}> {item.email} </a>
                </span>
              </div>
            );
          }
          return null;
        })}
    </>
  );
};

export const MapIcons = ({ data, className = '' }) => {
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

MapIcons.propTypes = {
  data: PropTypes.any,
  className: PropTypes.string,
};
MapComponent.propTypes = {
  data: PropTypes.array,
  type: PropTypes.any,
};
