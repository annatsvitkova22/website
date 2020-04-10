import React from 'react';
import PropTypes from 'prop-types';

const Resources = (props) => {
  const { navigationData, className = '' } = props;

  return (
    <ul className={`footer__sitemap-list ${className}`}>
      <li className={'footer__sitemap-link'}>Ресурси</li>
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
  );
};

Resources.propTypes = {
  navigationData: PropTypes.shape({
    menuItems: PropTypes.object,
  }),
  className: PropTypes.string,
};

export default Resources;
