import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';

import RoutesList from '~/lib/RoutesList';

const NavLink = ({ children, href, ...otherProps }) => {
  const { publicRuntimeConfig } = getConfig();
  const { apiUrl } = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

  if (href.startsWith(apiUrl)) {
    const tempHref = href.split(apiUrl)[1];
    const isStrictRoute =
      RoutesList.findIndex((item) => tempHref.startsWith(item)) !== -1 ||
      tempHref === '/';

    if (!isStrictRoute) {
      return (
        <Link href="[uri]" as={tempHref}>
          <a {...otherProps}>{children}</a>
        </Link>
      );
    }

    return (
      <Link href={href.replace(apiUrl, '')}>
        <a {...otherProps}>{children}</a>
      </Link>
    );
  }

  return (
    <a href={href} {...otherProps}>
      {children}
    </a>
  );
};

NavLink.propTypes = {
  children: PropTypes.string,
  href: PropTypes.string,
};

export default NavLink;
