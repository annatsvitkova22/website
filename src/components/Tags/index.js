import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ list }) => {
  return (
    <ul className={'tag-list'}>
      {list &&
        list.map((item) => {
          return (
            <li>
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
};

export default Tags;
