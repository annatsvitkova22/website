import React from 'react';
import PropTypes from 'prop-types';

const SideBarNews = ({ news }) => {
  return (
    <ul>
      <span>Новини</span>
      {news &&
        news.map((item) => {
          return (
            <a href={item.link}>
              <li key={item.id}>{item.title}</li>
            </a>
          );
        })}
    </ul>
  );
};

SideBarNews.propTypes = {
  news: PropTypes.array,
};

export default SideBarNews;
