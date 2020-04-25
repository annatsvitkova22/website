import React from 'react';
import * as classnames from 'classnames';



const Sorting = ({
  currentOption,
  onChange = () => {},
  options = [],
  className,
}) => {
  if (!options.length) return null;

  return (
    <ul className={classnames('sorting', className)}>
      {options.map((option) => (
        <li
          key={option.value}
          className={classnames('sorting__item', {
            'sorting__item--active': option.value === currentOption.value,
          })}
        >
          <button
            className="sorting__button"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Sorting;
