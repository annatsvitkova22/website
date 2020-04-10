import React from 'react';
import PropTypes from 'prop-types';

const PartnersLogo = (props) => {
  const { partnersData, className = '' } = props;

  return (
    <ul className={`footer__sitemap-list ${className}`}>
      <li className={'footer__sitemap-link'}>Наші партнери</li>
      {partnersData &&
        partnersData.map((item, i) => {
          return (
            <li className={'footer__sitemap-link'}>
              <a
                key={i}
                href={item.url}
                title={item.name}
                className={'partners-logo'}
                target={'_blank'}
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
  className: PropTypes.string,
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
