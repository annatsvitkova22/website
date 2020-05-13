import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getContentType } from '~/components/Content';

const Columns = ({ block, className = '' }) => {
  const countOfColumns = (source, word) => {
    if (!word) return 0;
    let res = 0;
    let index = 0;
    while ((index = source.indexOf(word)) >= 0) {
      source = source.substring(index + word.length);
      res++;
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
      {block.innerBlocks.map((column) => {
        return (
          <div className={`gutenberg__columns-column ${columnWidth}`}>
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
