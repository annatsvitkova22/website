import React from 'react';
import PropTypes from 'prop-types';

import NavLink from '~/components/SiteLink';

const Navigation = (props) => {
  const { navigationData, className = '' } = props;

  const [isVisible, setIsVisible] = React.useState({
    page: false,
    info: false,
  });

  const handlePageClick = () => {
    setIsVisible({
      ...isVisible,
      page: !isVisible.page,
    });
  };
  const handleInfoClick = () => {
    setIsVisible({
      ...isVisible,
      info: !isVisible.info,
    });
  };

  return (
    <ul className={`footer__sitemap-list ${className}`}>
      {navigationData.id === 'TWVudTo0' && (
        <>
          <li className={'footer__sitemap-title'} onClick={handlePageClick}>
            Сторінки
          </li>
          <ul className={`footer__sitemap-navigation`}>
            {navigationData &&
              navigationData.menuItems &&
              navigationData.menuItems.nodes &&
              isVisible.page &&
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
          <li className={'footer__sitemap-title'} onClick={handleInfoClick}>
            Інформація
          </li>
          <ul className={`footer__sitemap-navigation`}>
            {navigationData &&
              navigationData.menuItems &&
              navigationData.menuItems.nodes &&
              isVisible.info &&
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
