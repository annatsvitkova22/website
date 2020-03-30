import React from 'react';

const PartnersLogo = (props) => {
  const { partnersData } = props;

  return (
    <div className="partners__logo">
      {partnersData.map((item) => {
        return (
          <a href={item.url} title={item.name}>
            <img src={item.logo.mediaItemUrl} alt={item.logo.title} />
          </a>
        );
      })}
    </div>
  );
};

export default PartnersLogo;
