import React from 'react';
import PropTypes from 'prop-types';

import Times from '~/static/images/times-small';

const ClearIndicator = (props) => {
  const {
    children = <Times />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
      className="react-select__indicator react-select__clear-indicator"
    >
      {children}
    </div>
  );
};

ClearIndicator.propTypes = {
  children: PropTypes.object,
  getStyles: PropTypes.func,
  innerProps: PropTypes.object,
};

export default ClearIndicator;
