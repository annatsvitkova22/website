import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import Icons from '../Icons';

const SearchIcon = ({ color, className = '', onClick = () => {} }) => {
  const router = useRouter();
  const [onSearch, setOnSearch] = useState(null);

  useEffect(() => {
    router.route.search('search') > 0 ? setOnSearch(true) : setOnSearch(false);
  }, []);

  const btnCls = classNames({
    'search--active': onSearch,
  });
  return (
    <button className={`${className} ${btnCls}`} onClick={onClick}>
      <Icons icon={'search'} color={color} />
    </button>
  );
};

SearchIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default SearchIcon;
