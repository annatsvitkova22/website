import React from 'react';
import PropTypes from 'prop-types';

import NavLink from './SiteLink';

import HeaderCategory from '~/components/Header/HeaderCategory';

const Navigation = (props) => {
  const { navigationData } = props;
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li>
          <HeaderCategory className="navigation__list-link" />
        </li>
        {navigationData.nodes.length &&
          navigationData.nodes[0].menuItems &&
          navigationData.nodes[0].menuItems.nodes.map((item) => {
            return (
              <li key={item.id}>
                <NavLink
                  href={item.url}
                  target={item.target}
                  className="navigation__list-link"
                >
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
