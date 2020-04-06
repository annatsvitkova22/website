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
    <div className={`counters ${className}`}>
      <div className={'counters__wrapper around-xs'}>
        {publicationsData.pageInfo && (
          <div className={'counters__item'}>
            <span className={'counters__item-counter'}>
              {publicationsData.pageInfo.total}
            </span>
            <span className={'counters__item-description'}>Публікації</span>
          </div>
        )}
        {crowdfundingsData.pageInfo && (
          <div className={'counters__item'}>
            <span className={'counters__item-counter'}>
              {crowdfundingsData.pageInfo.total}
            </span>
            <span className={'counters__item-description'}>Проекти</span>
          </div>
        )}
        {blogsData.pageInfo && (
          <div className={'counters__item'}>
            <span className={'counters__item-counter'}>
              {blogsData.pageInfo.total}
            </span>
            <span className={'counters__item-description'}>Блоги</span>
          </div>
        )}
      </div>
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
