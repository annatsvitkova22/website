import React from 'react';
import PropTypes from 'prop-types';

const Counters = (props) => {
  const {
    blogsData,
    crowdfundingsData,
    publicationsData,
    className = '',
  } = props;
  return (
    // TODO: implement class with classNames module

    <div className={`footer__counters ${className}`}>
      {publicationsData.pageInfo && (
        <div className={'footer__counters-block'}>
          <span className={'footer__counters-counter'}>
            {publicationsData.pageInfo.total}
          </span>
          <span className={'footer__counters-description'}>Публікації</span>
        </div>
      )}
      {crowdfundingsData.pageInfo && (
        <div className={'footer__counters-block'}>
          <span className={'footer__counters-counter'}>
            {crowdfundingsData.pageInfo.total}
          </span>
          <span className={'footer__counters-description'}>Проекти</span>
        </div>
      )}
      {blogsData.pageInfo && (
        <div className={'footer__counters-block'}>
          <span className={'footer__counters-counter'}>
            {blogsData.pageInfo.total}
          </span>
          <span className={'footer__counters-description'}>Блоги</span>
        </div>
      )}
    </div>
  );
};

Counters.propTypes = {
  blogsData: PropTypes.object,
  crowdfundingsData: PropTypes.object,
  publicationsData: PropTypes.object,
  className: PropTypes.string,
};

export default Counters;
