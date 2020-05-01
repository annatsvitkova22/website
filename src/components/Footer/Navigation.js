import React from 'react';
import PropTypes from 'prop-types';

import NavLink from '~/components/SiteLink';
import Icons from '~/components/Icons';

const Navigation = (props) => {
  const { navigationData, className = '', handleClick } = props;

  return (
    <div className={`footer__sitemap-list ${className}`}>
      {navigationData.id === 'TWVudTo0' && (
        <>
          <div className={'footer__sitemap-title'} onClick={handleClick}>
            Сторінки
            <Icons
              className={'footer__sitemap-chevron'}
              icon={'footer-chevron'}
            />
          </div>
          <ul className={`footer__sitemap-navigation`}>
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
        </>
      )}
      {navigationData.id === 'TWVudTo1' && (
        <>
          <div className={'footer__sitemap-title'} onClick={handleClick}>
            Інформація
            <Icons
              className={'footer__sitemap-chevron'}
              icon={'footer-chevron'}
            />
          </div>
          <ul className={`footer__sitemap-navigation`}>
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
        </>
      )}
    </div>
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
  handleClick: PropTypes.any,
};

export default Navigation;
