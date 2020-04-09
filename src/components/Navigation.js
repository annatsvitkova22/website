import React from 'react';
import PropTypes from 'prop-types';

import NavLink from './SiteLink';

const Navigation = (props) => {
  const { navigationData } = props;
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navigationData.nodes.length &&
          navigationData.nodes[0].menuItems &&
          navigationData.nodes[0].menuItems.nodes.map((item) => {
            return (
              <li key={item.id} className="navigation__list-item">
                <NavLink href={item.url} target={item.target}>
                  {item.label}
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
};

export default Navigation;
