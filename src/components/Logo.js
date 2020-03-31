import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
  const { logoData } = props;

  return (
    <img src={logoData.mediaItemUrl} alt={logoData.title} className="logo" />
  );
};

Logo.propTypes = {
  logoData: PropTypes.shape({
    mediaItemUrl: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default Logo;
