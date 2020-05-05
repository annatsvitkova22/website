import React from 'react';

import Icons from '~/components/Icons';

const Dropdown = ({ data, className = '' }) => {
  const dropdownData = data.nodes.filter((item) => {
    return item.name === 'Ресурси';
  });

  return (
    <div className={className}>
      {dropdownData[0].menuItems.nodes &&
        dropdownData[0].menuItems.nodes.map((item, index) => {
          return (
            <a href={item.url} className={'header__dd-link'} key={index}>
              <Icons icon={item.label} className={'header__dd-icon'} />
              <span className={'header__dd-text'}>{item.label}</span>
            </a>
          );
        })}
    </div>
  );
};

export default Dropdown;
