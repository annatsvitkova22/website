import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

import Sorting from '~/components/Sorting';
import { setCategory, setDate, setSorting } from '~/stores/News';
import Calendar from '~/components/Calendar';
import Filter from '~/components/Filter';

const SidebarNews = ({
  className,
  currentSorting,
  sorting,
  filters,
  currentCategory,
}) => {
  return (
    <aside className={classnames('sidebar--news', className)}>
      <Sorting
        currentOption={currentSorting}
        options={sorting}
        className="sorting--news"
        onChange={setSorting}
      />
      <Calendar onChange={setDate} currentValue={filters.date} />
      <Filter
        currentOption={currentCategory}
        className="filter--categories"
        options={filters.categories}
        onChange={setCategory}
      />
    </aside>
  );
};

SidebarNews.propTypes = {
  className: PropTypes.any,
  currentSorting: PropTypes.any,
  sorting: PropTypes.any,
  filters: PropTypes.any,
  currentCategory: PropTypes.any,
};

export default SidebarNews;
