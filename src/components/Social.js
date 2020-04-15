import React from 'react';
import PropTypes from 'prop-types';

import Icons from './Icons';

const Social = (props) => {
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
            className={'link'}
          >
            <Icons icon={`${item.name}`} color={color} className={'icon'} />
          </a>
        );
      })}
    </div>
  );
};

Social.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  socialsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default Social;
