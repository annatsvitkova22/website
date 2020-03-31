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
      <div className="counters__wrapper around-xs">
        {publicationsData.pageInfo && (
          <div className="counters__item">
            <span>{publicationsData.pageInfo.total}</span>
            <span>Публікації</span>
          </div>
        )}
        {crowdfundingsData.pageInfo && (
          <div className="counters__item">
            <span>{crowdfundingsData.pageInfo.total}</span>
            <span>Проекти</span>
          </div>
        )}
        {blogsData.pageInfo && (
          <div className="counters__item">
            <span>{blogsData.pageInfo.total}</span>
            <span>Блоги</span>
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
