import React from 'react';
import PropTypes from 'prop-types';

import NavLink from './SiteLink';

const Navigation = (props) => {
  const { navigationData } = props;
  return (
    <nav className="navigation col-6">
      <ul className="navigation__list justify-content-around">
        {navigationData.nodes.length &&
          navigationData.nodes[0].menuItems &&
          navigationData.nodes[0].menuItems.nodes.map((item) => {
            return (
              <li key={item.id} className="justify-content-around">
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
