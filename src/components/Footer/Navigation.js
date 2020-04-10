import React from 'react';
import PropTypes from 'prop-types';

import NavLink from '~/components/SiteLink';

const Navigation = (props) => {
  const { navigationData, className = '' } = props;

  return (
    <ul className={`footer__sitemap-list ${className}`}>
      {navigationData.id === 'TWVudTo0' && (
        <li className={'footer__sitemap-link'}>Сторінки</li>
      )}
      {navigationData.id === 'TWVudTo1' && (
        <li className={'footer__sitemap-link'}>Інформація</li>
      )}
      {navigationData &&
        navigationData.menuItems &&
        navigationData.menuItems.nodes &&
        navigationData.menuItems.nodes.map((item) => {
          return (
            <li className={'footer__sitemap-link'} key={item.id}>
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
