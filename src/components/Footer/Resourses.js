import React from 'react';
import PropTypes from 'prop-types';

const Resources = (props) => {
  const { navigationData } = props;

  return (
    <ul className="sitemap__list">
      {navigationData &&
        navigationData.menuItems &&
        navigationData.menuItems.nodes &&
        navigationData.menuItems.nodes.map((item) => {
          return (
            <li className="sitemap__list-item" key={item.id}>
              <a href={item.url}>{item.label}</a>
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
};

export default Resources;
