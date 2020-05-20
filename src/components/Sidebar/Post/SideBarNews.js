import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SidebarLoader from '~/components/Loaders/SidebarLoader';
import ArticleDate from '~/components/Article/Date';

const SideBarNews = ({ news }) => {
  if (!news) return <SidebarLoader />;
  return (
    <ul className={'sidebar-news'}>
      <li className={'sidebar-news__title'}>останні новини</li>
      {news.nodes.map((item, i) => {
        return (
          <li key={i} className={'sidebar-news__item'}>
            <Link href={`/news/[slug]`} as={`/news/${item.slug}`}>
              <a href={`/news/${item.slug}`} className={'sidebar-news__link'}>
                <ArticleDate date={item.date} />
                {item.title.toLowerCase()}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

SideBarNews.propTypes = {
  news: PropTypes.object,
};

export default SideBarNews;
