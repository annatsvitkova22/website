import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

import SidebarLoader from '~/components/Loaders/SidebarLoader';

const SideBarNews = ({ news, fetchingContent, isLoading }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'latest__news'}>
      <span>Новини</span>
      {news.nodes.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <a href={item.link}>
              <li key={item.id}>{item.title}</li>
            </a>
            {i === news.nodes.length - 5 && i < news.pageInfo.total && (
              <Waypoint onEnter={fetchingContent} />
            )}
          </React.Fragment>
        );
      })}
      {isLoading && <SidebarLoader />}
    </ul>
  );
};

SideBarNews.propTypes = {
  news: PropTypes.array,
};

export default SideBarNews;
