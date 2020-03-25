import React from 'react';

const data = [
  {
    name: 'публікації',
    count: 123,
  },
  {
    name: 'проектів',
    count: 35,
  },
  {
    name: 'Блогів',
    count: 4,
  },
];

const FooterCounter = () => {
  return (
    <div className="counter__wrapper around-xs">
      {data.map((item) => {
        return (
          <div className="counter__item">
            <span>{item.count}</span>
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FooterCounter;
