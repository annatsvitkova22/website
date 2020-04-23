import React from 'react';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';

import Sorting from '~/components/Sorting';
import { NewsStore, setCategory, setDate, setSorting } from '~/stores/News';
import Calendar from '~/components/Calendar';
import Filter from '~/components/Filter';

const SidebarNews = ({ className }) => {
  const stateLink = useStateLink(NewsStore);
  const state = stateLink.get();

  const currentSorting = state.sorting.find((i) => i.active);
  const currentCategory = state.filters.categories.find((i) => i.active);

  return (
    <aside className={classnames('sidebar--news', className)}>
      <Sorting
        currentOption={currentSorting}
        options={state.sorting}
        className="sorting--news"
        onChange={setSorting}
      />
      <Calendar
        onChange={setDate}
        currentValue={new Date(state.filters.date)}
      />
      <Filter
        currentOption={currentCategory}
        className="filter--categories"
        options={state.filters.categories}
        onChange={setCategory}
      />
    </aside>
  );
};

export default SidebarNews;
