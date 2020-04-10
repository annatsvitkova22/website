import React from 'react';
import PropTypes from 'prop-types';

import Icons from './Icons';

const Socials = (props) => {
  const { socialsData, color, className = '' } = props;

  return (
    <div className={`${className}`}>
      {socialsData.map((item, i) => {
        return (
          <a
            href={item.url}
            title={item.name}
            key={i}
            target={'_blank'}
            className={'footer__data-link'}
          >
            <Icons
              icon={item.name}
              color={color}
              className={'footer__data-icon'}
            />
          </a>
        );
      })}
    </div>
  );
};

Socials.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  socialsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default Socials;
