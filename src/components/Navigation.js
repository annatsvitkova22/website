import React from 'react';
import PropTypes from 'prop-types';

import NavLink from './NavLink';

const Navigation = (props) => {
  const { navigationData } = props;
  return (
    <nav className="navigation col-xs-6">
      <ul className="navigation__list around-xs">
        {navigationData.nodes.length &&
          navigationData.nodes[0].menuItems &&
          navigationData.nodes[0].menuItems.nodes.map((item) => {
            return (
              <li key={item.id} className="around-xs">
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
  navigation: PropTypes.array,
};

export default Navigation;
