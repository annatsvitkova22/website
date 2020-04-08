import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ list, className = '' }) => {
  return (
    <ul className={`${className} category-tag__list `}>
      {list &&
        list.map((item) => {
          return (
            <li className={`${className}-item`}>
              <a href={item.link} key={item.id}>
                {item.name}
              </a>
            </li>
          );
        })}
    </ul>
  );
};

Tags.propTypes = {
  list: PropTypes.any,
  className: PropTypes.string,
};

export default Tags;
