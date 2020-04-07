import React from 'react';
import PropTypes from 'prop-types';

import NavLink from '~/components/SiteLink';

const Navigation = (props) => {
  const { navigationData, className = '' } = props;

  return (
    <ul className={`sitemap__list ${className}`}>
      {navigationData.id === 'TWVudTo0' && (
        <li className={'sitemap__list-item'}>Сторінки</li>
      )}
      {navigationData.id === 'TWVudTo1' && (
        <li className={'sitemap__list-item'}>Інформація</li>
      )}
      {navigationData &&
        navigationData.menuItems &&
        navigationData.menuItems.nodes &&
        navigationData.menuItems.nodes.map((item) => {
          return (
            <li className={'sitemap__list-item'} key={item.id}>
              <NavLink href={item.url} target={item.target}>
                {item.label}
              </NavLink>
            </li>
          );
        })}
    </ul>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  navigationData: PropTypes.shape({
    id: PropTypes.string,
    menuItems: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    }),
  }),
};

export default Navigation;
