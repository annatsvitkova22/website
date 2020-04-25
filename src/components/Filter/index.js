import React from 'react';
import * as classnames from 'classnames';


const Filter = ({
  currentOption = {},
  onChange = () => {},
  options = [],
  className,
}) => {
  if (!options.length) return null;

  return (
    <ul className={classnames('filter', className)}>
      {options.map((option) => (
        <li
          key={option.value}
          className={classnames('filter__item', {
            'filter__item--active': option.value === currentOption.value,
          })}
        >
          <button
            className="filter__button"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Filter;
