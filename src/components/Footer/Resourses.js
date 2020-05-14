import React from 'react';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';

const Resources = (props) => {
  const { navigationData, className = '', handleClick } = props;

  return (
    <div className={`footer__sitemap-list ${className}`}>
      <div className={'footer__sitemap-title'} onClick={handleClick}>
        Ресурси
        <Icons className={'footer__sitemap-chevron'} icon={'footer-chevron'} />
      </div>
      <ul className={`footer__sitemap-navigation`}>
        {navigationData &&
          navigationData.menuItems &&
          navigationData.menuItems.nodes &&
          navigationData.menuItems.nodes.map((item) => {
            return (
              <li className={'footer__sitemap-link'} key={item.id}>
                <a rel="noopener noreferrer" href={item.url} target={'_blank'}>
                  {item.label}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

Resources.propTypes = {
  navigationData: PropTypes.shape({
    menuItems: PropTypes.object,
  }),
  className: PropTypes.string,
  handleClick: PropTypes.any,
};

export default Resources;
