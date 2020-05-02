import React from 'react';
import PropTypes from 'prop-types';
import { getContentType } from '~/components/Content';

const Columns = ({ block }) => {
  return (
    <div className="row">
      {block.innerBlocks.map((column) => {
        return (
          <div className="col-md-6">
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
};

export default Columns;
