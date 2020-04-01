import React from 'react';
import PropTypes from 'prop-types';

const List = ({ block }) => {
  if (block.attributes) {
    const regex = /\<\/li\>/g;
    const listString = block.attributes.values;
    const listArray = listString
      .replace(regex, `</li> `)
      .split(' ')
      .slice(0, -1);

    return (
      <ul className={block.attributes.className}>
        {listArray.map((item) => {
          return <React.Fragment dangerouslySetInnerHTML={{ __html: item }} />;
        })}
      </ul>
    );
  }
  return <div>List</div>;
};

List.propTypes = {
  block: PropTypes.any,
};

export default List;
