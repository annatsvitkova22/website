import React from 'react';
import PropTypes from 'prop-types';

const PartnersLogo = (props) => {
  const { partnersData, className = '' } = props;

  return (
    <div className={`footer__sitemap-list ${className}`}>
      <div className={'footer__sitemap-title partners-img'}>Наші партнери</div>
      <ul className={'footer__sitemap-navigation'}>
        {partnersData &&
          partnersData.map((item, i) => {
            return (
              <li className={'footer__sitemap-partner'} key={i}>
                <a
                  rel="noopener noreferrer"
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
    </div>
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
