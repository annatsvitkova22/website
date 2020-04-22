import React, { useContext } from 'react';
import * as classnames from 'classnames';

import Sorting from '~/components/Sorting';
import NewsContext from '~/stores/News';

const SidebarNews = ({ className }) => {
  const changeSorting = (option) => {
    console.log(option);
  }

  const newsContext = useContext(NewsContext);

  return (
    <aside className={classnames('sidebar--news', className)}>
      <Sorting
        options={newsContext.sorting}
        className={classnames('sorting--news', className)}
        onChange={changeSorting}
      />
    </aside>
  );
};

export default SidebarNews;
