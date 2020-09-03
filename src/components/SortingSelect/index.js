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
    <select
      onChange={(e) => onChange(e.target.value)}
      className={classnames(className)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          className={classnames('sorting__item', {
            'sorting__item--active': option.value === currentOption.value,
          })}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Sorting;
