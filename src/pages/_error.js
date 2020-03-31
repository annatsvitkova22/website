import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

Error.propTypes = {
  statusCode: PropTypes.string,
};

Error.getInitialProps = ({ res, err }) => {
  /* eslint-disable no-nested-ternary */
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
