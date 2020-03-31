import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

const Error = ({ statusCode }) => {
  return (
    <h1>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </h1>
  );
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.getInitialProps = ({ res, err, asPath }) => {
  /* eslint-disable no-nested-ternary */
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  // TODO: check if this is a dirty fix
  // anyway, it fixes next js error for rendering pages with / in the end as 404 on server
  const checkForTrailingSlashes = () => {
    if (asPath.match(/\/$/)) {
      // check if the path ends with trailing slash
      const withoutTrailingSlash = asPath.substr(0, asPath.length - 1);
      if (res) {
        res.writeHead(302, {
          Location: withoutTrailingSlash,
        });
        res.end();
      } else {
        Router.push(withoutTrailingSlash);
      }
    }
  };

  checkForTrailingSlashes();

  return { statusCode };
};

export default Error;
