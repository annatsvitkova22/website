import React from 'react';

const Counter = (props) => {
  const { blogsData, postsData } = props;
  return (
    <div className="counter__wrapper around-xs">
      <div className="counter__item">
        <span>24</span>
        <span>Публікації</span>
      </div>
      <div className="counter__item">
        <span>{postsData.pageInfo.total}</span>
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
