import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Navigation = (props) => {
  const { navigationData } = props;

  return (
    <ul className="sitemap__list">
      {navigationData &&
        navigationData.menuItems &&
        navigationData.menuItems.nodes &&
        navigationData.menuItems.nodes.map((item) => {
          return (
            <li className="sitemap__list-item" key={item.id}>
              <Link href={item.url}>
                <a href={item.url}>{item.label}</a>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

Navigation.propTypes = {
  navigationData: PropTypes.shape({
    menuItems: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    }),
  }),
};

export default Navigation;
