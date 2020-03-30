import React from 'react';
import Link from 'next/link';

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
                <Link href={item.url}>
                  <a target={item.target} href={item.url}>
                    {item.label}
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Navigation;
