import React from 'react';

const Counter = (props) => {
  const { blogsData, crowdfundingsData, publicationsData } = props;
  return (
    <div className="counter__wrapper around-xs">
      <div className="counter__item">
        <span>{publicationsData.pageInfo.total}</span>
        <span>Публікації</span>
      </div>
      <div className="counter__item">
        <span>{crowdfundingsData.pageInfo} 2</span>
        <span>Проекти</span>
      </div>
      <div className="counter__item">
        <span>{blogsData.pageInfo.total}</span>
        <span>Блоги</span>
      </div>
    </div>
  );
};

export default Counter;
