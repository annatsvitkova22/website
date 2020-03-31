import React from 'react';
import PropTypes from 'prop-types';

const PartnersLogo = (props) => {
  const { partnersData } = props;

  return (
    <div className="partners__logo">
      {partnersData &&
        partnersData.map((item, i) => {
          return (
            <a key={i} href={item.url} title={item.name}>
              <img src={item.logo.mediaItemUrl} alt={item.logo.title} />
            </a>
          );
        })}
    </div>
  );
};
PartnersLogo.propTypes = {
  partnersData: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.shape({
        mediaItemUrl: PropTypes.string,
        title: PropTypes.string,
      }),
    })
  ),
};

export default PartnersLogo;
