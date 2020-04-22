import React, { useState } from 'react';
import * as classnames from 'classnames';

const Filter = ({
  defaultValue,
  onChange = () => {},
  options = [],
  className,
}) => {
  const [currentOption, setCurrentOption] = useState(defaultValue);

  if (!options.length) return null;

  const change = (option) => {
    setCurrentOption(option);
    onChange();
  };

  return (
    <ul className={classnames('filter', className)}>
      {options.map((option) => (
        <li
          key={option.value}
          className={classnames('filter__item', {
            'filter__item--active': option.value === currentOption,
          })}
        >
          <button onClick={() => change(option.value)}>{option.label}</button>
        </li>
      ))}
    </ul>
  );
};

export default Filter;
