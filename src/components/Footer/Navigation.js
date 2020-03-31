import React from 'react';

import NavLink from '~/components/SiteLink';

const Navigation = (props) => {
  const { navigationData } = props;

  return (
    <ul className="sitemap__list">
      {navigationData &&
        navigationData.menuItems &&
        navigationData.menuItems.nodes &&
        navigationData.menuItems.nodes.map((item) => {
          return (
            <li className="sitemap__list-item" key={item.id}>
              <NavLink href={item.url} target={item.target}>
                {item.label}
              </NavLink>
            </li>
          );
        })}
    </ul>
  );
};

export default Navigation;
