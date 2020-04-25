import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';

import RoutesList from '~/lib/RoutesList';

const NavLink = ({ children, href, ...otherProps }) => {
  const { publicRuntimeConfig } = getConfig();
  const { apiUrl, frontUrl } = publicRuntimeConfig.find(
    (e) => e.env === process.env.ENV
  );

  if (href.startsWith(apiUrl) || href.startsWith(frontUrl)) {
    let tempHref = href.split(apiUrl)[1];
    if (href.startsWith(frontUrl)) {
      /* eslint-disable prefer-destructuring */
      tempHref = href.split(frontUrl)[1];
      /* eslint-enable prefer-destructuring */
    }

    const isStrictRoute =
      RoutesList.findIndex((item) => tempHref.startsWith(item)) !== -1 ||
      tempHref === '/';

    if (!isStrictRoute && tempHref.startsWith('/tag')) {
      return (
        <Link
          href={`/search?query=${cleanUrl(tempHref.split('/tag/')[1])}&by=tag`}
        >
          <a {...otherProps}>{children}</a>
        </Link>
      );
    }

    if (!isStrictRoute) {
      return (
        <Link href="[uri]" as={tempHref}>
          <a {...otherProps}>{children}</a>
        </Link>
      );
    }

    return (
      <Link href={tempHref}>
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

const cleanUrl = (url) => {
  if (url[url.length - 1] === '/') {
    return url.slice(0, -1);
  }
  return url;
};

export default NavLink;
