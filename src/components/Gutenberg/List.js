import React from 'react';
import PropTypes from 'prop-types';

const List = ({ block }) => {
  const regex = /\<\/li\>/g;
  const listString = block.attributes.values;
  const listArray = listString.replace(regex, `</li>,`).split(',').slice(0, -1);

  return (
    <ul className={block.attributes.className}>
      {listArray.map((item, index) => {
        return <li dangerouslySetInnerHTML={{ __html: item }} key={index} />;
      })}
    </ul>
  );
};

List.propTypes = {
  block: PropTypes.any,
};

export default List;
