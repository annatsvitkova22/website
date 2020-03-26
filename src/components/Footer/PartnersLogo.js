import React from 'react';

const PartnersLogo = (props) => {
  const { partnersData } = props;
  return (
    <div className="partners__logo">
      <a href="#">
        <img src={partnersData.mediaItemUrl} alt="Logo" className="logo" />
      </a>
      <a href="#">
        <img src={partnersData.mediaItemUrl} alt="Logo" className="logo" />
      </a>
    </div>
  );
};

export default PartnersLogo;
