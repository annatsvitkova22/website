import React, { useState } from 'react';
import * as classnames from 'classnames';

const Sorting = ({
  defaultValue,
  onChange = () => {},
  options = [],
  className,
}) => {
  if (!options.length) return null;
  defaultValue = defaultValue || options[0].value;

  const [currentOption, setCurrentOption] = useState(defaultValue);

  const change = (option) => {
    setCurrentOption(option);
    onChange();
  };

  return (
    <ul className={classnames('sorting', className)}>
      {options.map((option) => (
        <li
          key={option.value}
          className={classnames('sorting__item', {
            'sorting__item--active': option.value === currentOption,
          })}
        >
          <button onClick={() => change(option.value)}>{option.label}</button>
        </li>
      ))}
    </ul>
  );
};

export default Sorting;
