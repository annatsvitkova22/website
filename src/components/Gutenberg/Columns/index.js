import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getContentType } from '~/components/Content';

const Columns = ({ block, className = '' }) => {
  const countOfColumns = (source, word) => {
    let sr = source;
    if (!word) return 0;
    let res = 0;
    let index = 0;
    while ((index = sr.indexOf(word)) >= 0) {
      sr = sr.substring(index + word.length);
      res += 1;
    }
    return res;
  };
  const countColumns = countOfColumns(block.saveContent, 'wp:column') / 2;
  const columnWidth = classNames({
    'col-md-6': countColumns === 2,
    'col-md-4': countColumns === 3,
    'col-md-3': countColumns === 4,
    'col-md-2': countColumns === 5 || countColumns === 6,
  });

  return (
    <div className={`gutenberg__columns row ${className}`}>
      {block.innerBlocks.map((column, i) => {
        return (
          <div
            className={`gutenberg__columns-column ${columnWidth}`}
            key={i + 1}
          >
            {column.innerBlocks.map((b, index) =>
              getContentType({ block: b, index })
            )}
          </div>
        );
      })}
    </div>
  );
};

Columns.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default Columns;
