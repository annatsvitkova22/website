import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';

const SiteLink = ({ children, href, ...otherProps }) => {
  const { publicRuntimeConfig } = getConfig();
  const { apiUrl } = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

  if (href.startsWith(apiUrl)) {
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

SiteLink.propTypes = {
  children: PropTypes.string,
  href: PropTypes.string,
};

export default SiteLink;
