import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';

import NavLink from './SiteLink';

const Navigation = ({ navigationData, className = '' }) => {
  return (
    <nav className={`${className}`}>
      <ul className="navigation__list">
        {navigationData &&
          navigationData.nodes &&
          navigationData.nodes[0].menuItems.nodes.map((item) => {
            return (
              <li
                key={item.id}
                className={classnames('navigation__item', {
                  'navigation__item--highlighted':
                    item.menuItemACF.ishighlighted,
                })}
              >
                <NavLink
                  href={item.url}
                  target={item.target}
                  className="navigation__link"
                >
                  {`${item.menuItemACF.ishighlighted ? '!' : ''}${item.label}`}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  navigationData: PropTypes.object,
  className: PropTypes.string,
};

export default Navigation;
