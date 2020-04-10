import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
  const { logoData, className } = props;

  return (
    <img
      src={logoData.mediaItemUrl}
      alt={logoData.title}
      className={className}
    />
  );
};

Logo.propTypes = {
  logoData: PropTypes.shape({
    mediaItemUrl: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default Logo;
