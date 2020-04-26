import React from 'react';
import PropTypes from 'prop-types';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarPopular = ({ news }) => {
  if (!news) return <SidebarLoader />;

  return (
    <ul className={'sidebar-popular'}>
      <li className={'sidebar-popular__title'}>популярне</li>
      {news.nodes.slice(5).map((item, i) => {
        return (
          <li key={i} className={'sidebar-popular__item'}>
            <a href={item.link}>
              <div className={'sidebar-popular__wrapper'}>
                <span className={'sidebar-popular__text'}>{item.title}</span>
                <span className="sidebar-popular__image" />
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

SideBarPopular.propTypes = {
  news: PropTypes.array,
  fetchingContent: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default SideBarPopular;
