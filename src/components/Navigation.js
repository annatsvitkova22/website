import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { useRouter } from 'next/router';

import NavLink from './SiteLink';

const Navigation = (props) => {
  const { navigationData, className = '' } = props;
  const [route, setRoute] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const routes = router.asPath.substring(router.asPath.indexOf('/'), 5);

    setRoute(routes);
  }, [router]);

  const naviData = navigationData.nodes.filter((item) => {
    return item.name === 'Головне';
  });

  return (
    <nav className={`${className}`}>
      <ul className="navigation__list">
        {naviData &&
          naviData[0].menuItems.nodes &&
          naviData[0].menuItems.nodes.map((item) => {
            return (
              <li
                key={item.id}
                className={classnames('navigation__item', {
                  'navigation__item--highlighted':
                    item.menuItemACF.ishighlighted,
                  // TODO: restore working version
                  // 'navigation__item--active': item.url.match(route),
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
