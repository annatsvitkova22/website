import React from 'react';
import PropTypes from 'prop-types';

import { getContentType } from '~/components/Content';

const Columns = ({ block, className = '' }) => {
  return (
    <div className={`row ${className}`}>
      {block.innerBlocks.map((column) => {
        return (
          <div className={'col-md-6'}>
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
