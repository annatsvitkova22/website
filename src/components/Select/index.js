import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import DropdownIndicator from './DropdownIndicator';
import ClearIndicator from './ClearIndicator';

const SiteSelect = (props) => {
  const colorStyles = {
    valueContainer: (styles) => ({
      ...styles,
      paddingLeft: 0,
      paddingRight: 0,
    }),
    placeholder: (styles) => ({ ...styles, color: '#242424' }),
    control: (styles) => ({
      ...styles,
      border: 'none',
      borderRadius: 0,
      paddingLeft: 13,
      paddingRight: 13,
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
      marginBottom: 0,
      borderRadius: 0,
      left: 0,
      boxShadow: '0px -6px 6px white, 0px 0px 6px rgba(0, 0, 0, 0.25)',
    }),
    menuList: (styles) => ({ ...styles, paddingTop: 0, paddingBottom: 0 }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: 'none',
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      backgroundColor: isSelected || isFocused ? '#85e9c8' : '',
      color: isSelected || isFocused ? '#242424' : '',
    }),
  };

  const value = props.options.find(i => i.active);

  return (
    <Select
      {...props}
      value={value}
      classNamePrefix="react-select"
      // defaultMenuIsOpen={props.instanceId === 0}
      isClearable
      isSearchable={false}
      styles={colorStyles}
      components={{ ClearIndicator, DropdownIndicator }}
    />
  );
};

SiteSelect.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default SiteSelect;
