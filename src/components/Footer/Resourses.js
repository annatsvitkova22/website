import React from 'react';
import PropTypes from 'prop-types';

const Resources = (props) => {
  const { navigationData, className = '', isVisible, handleResClick } = props;

  return (
    <ul className={`footer__sitemap-list ${className}`}>
      <li className={'footer__sitemap-title'} onClick={handleResClick}>
        Ресурси
      </li>
      <ul className={`footer__sitemap-navigation`}>
        {navigationData &&
          navigationData.menuItems &&
          navigationData.menuItems.nodes &&
          isVisible &&
          navigationData.menuItems.nodes.map((item) => {
            return (
              <li className={'footer__sitemap-link'} key={item.id}>
                <a href={item.url} target={'_blank'}>
                  {item.label}
                </a>
              </li>
            );
          })}
      </ul>
    </ul>
  );
};

Resources.propTypes = {
  navigationData: PropTypes.shape({
    menuItems: PropTypes.object,
  }),
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  handleResClick: PropTypes.any,
};

export default Resources;
