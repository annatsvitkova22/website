import React from 'react';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';

const Resources = (props) => {
  const { navigationData, className = '', isOpen, handleClick } = props;

  return (
    <ul className={`footer__sitemap-list ${className}`}>
      <li className={'footer__sitemap-title'} onClick={handleClick}>
        Ресурси
        <Icons className={'footer__sitemap-chevron'} icon={'footer-chevron'} />
      </li>
      <ul className={`footer__sitemap-navigation ${isOpen}`}>
        {navigationData &&
          navigationData.menuItems &&
          navigationData.menuItems.nodes &&
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
  isOpen: PropTypes.string,
  handleClick: PropTypes.any,
};

export default Resources;
