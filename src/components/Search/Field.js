import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useRouter } from 'next/router';

import Icons from '~/components/Icons';

const SearchField = ({ className = '', onSearch = () => {}, isOpen }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputElement.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const search = async () => {
    if (!query) {
      router.push({
        pathname: '/search',
      });
      return onSearch();
    }
    await router.push({
      pathname: '/search',
      query: { q: query },
    });
    return onSearch();
  };

  return (
    <div className={classnames('search-field', className)}>
      <input
        ref={inputElement}
        onChange={({ currentTarget }) => setQuery(currentTarget.value)}
        onKeyPress={({ key }) => {
          if (key === 'Enter') search();
        }}
        className={'search-field__input'}
        type="text"
        placeholder={'Пошук'}
        value={query}
      />
      <button
        onClick={() => {
          setQuery('');
          onSearch();
        }}
        className={'search-field__button'}
      >
        <Icons icon={'close-comment'} />
      </button>
    </div>
  );
};

SearchField.propTypes = {
  className: PropTypes.string,
};

export default SearchField;
