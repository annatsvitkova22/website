import React from 'react';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';

import Sorting from '~/components/Sorting';
import { NewsStore, setSorting } from '~/stores/News';

const SidebarNews = ({ className }) => {
  const stateLink = useStateLink(NewsStore);
  const state = stateLink.get();

  const currentOption = state.sorting.find((i) => i.active);

  return (
    <aside className={classnames('sidebar--news', className)}>
      <Sorting
        currentOption={currentOption}
        options={state.sorting}
        className="sorting--news"
        onChange={setSorting}
      />
    </aside>
  );
};

export default SidebarNews;
