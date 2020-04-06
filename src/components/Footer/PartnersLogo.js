import React from 'react';
import PropTypes from 'prop-types';

const PartnersLogo = (props) => {
  const { partnersData, className = '' } = props;

  return (
    <ul className={`sitemap__list ${className}`}>
      <li className={'sitemap__list-item'}>Наші партнери</li>
      {partnersData &&
        partnersData.map((item, i) => {
          return (
            <li className={'sitemap__list-item'}>
              <a
                key={i}
                href={item.url}
                title={item.name}
                className={'partners-logo'}
              >
                <img src={item.logo.mediaItemUrl} alt={item.logo.title} />
              </a>
            </li>
          );
        })}
    </ul>
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
