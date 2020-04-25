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

  const {
    name,
    placeholder,
    options,
    mobile,
    instanceId,
    onChangeHtml,
  } = props;

  if (!mobile) {
    return (
      <Select
        classNamePrefix="react-select"
        // defaultMenuIsOpen={props.instanceId === 0}
        isClearable
        isSearchable={false}
        styles={colorStyles}
        components={{ ClearIndicator, DropdownIndicator }}
        {...props}
      />
    );
  }

  return (
    <select
      name={name}
      id={`mobile-filter-${instanceId}`}
      className="mobile-select tx-family-titles tx-small"
      defaultValue="placeholder"
      onChange={onChangeHtml}
    >
      <option value="placeholder" disabled>
        {placeholder}
      </option>
      {options.map(({ value, label, mobileLabel }, k) => {
        const optionTitle = mobileLabel || label;
        return (
          <option key={k} value={value}>
            {optionTitle}
          </option>
        );
      })}
    </select>
  );
};

SiteSelect.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default SiteSelect;
