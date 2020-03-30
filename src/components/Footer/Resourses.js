import React from 'react';

const Resources = (props) => {
  const { navigationData } = props;

  return (
    <ul className="sitemap__list">
      {navigationData.menuItems.nodes.map((item) => {
        return (
          <li className="sitemap__list-item" key={item.id}>
            <a href={item.url}>{item.label}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Resources;
