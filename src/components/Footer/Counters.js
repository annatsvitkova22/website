import React from 'react';

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
          <div className="counter__item">
            <span>{publicationsData.pageInfo.total}</span>
            <span>Публікації</span>
          </div>
        )}
        {crowdfundingsData.pageInfo && (
          <div className="counter__item">
            <span>{crowdfundingsData.pageInfo.total}</span>
            <span>Проекти</span>
          </div>
        )}
        {blogsData.pageInfo && (
          <div className="counter__item">
            <span>{blogsData.pageInfo.total}</span>
            <span>Блоги</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counters;
