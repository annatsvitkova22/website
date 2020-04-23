import React from 'react';
import { components } from 'react-select';

import ChevronDown from '~/static/images/chevron-down';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
